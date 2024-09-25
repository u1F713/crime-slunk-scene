import fs from 'node:fs/promises'
import path from 'node:path'
import {Schema} from '@effect/schema'
import {type EvaluateOptions, compile, run} from '@mdx-js/mdx'
import {Effect, Stream, pipe} from 'effect'
import * as runtime from 'react/jsx-runtime'
import yaml from 'yaml'

const _frontmatterRegex = /---(.*?)---/s

const parseFrontmatter = <A, I>(
  content: string,
  schema: Schema.Schema<A, I>,
) =>
  pipe(content.match(_frontmatterRegex)?.[1], frontmatter =>
    frontmatter
      ? Schema.decode(schema)(yaml.parse(frontmatter))
      : Effect.fail(frontmatter),
  )

const readContentDirectory = (directory: string) =>
  Effect.promise(() => fs.readdir(directory)).pipe(
    Stream.fromIterableEffect,
    Stream.filter(file => /\.(mdx|md)$/.test(path.extname(file))),
    Stream.map(file => path.join(directory, file)),
  )

const readContentFile =
  <A, I>(schema: Schema.Schema<A, I>) =>
  (file: string) =>
    Effect.gen(function* () {
      const content = yield* Effect.promise(() => fs.readFile(file, 'utf-8'))
      const frontmatter = yield* parseFrontmatter(content, schema)
      const {base: id, name: slug} = path.parse(file)

      return {
        id,
        slug,
        data: frontmatter,
        content: content.replace(_frontmatterRegex, ''),
      }
    })

export const getCollection = <A, I>(
  directory: string,
  schema: Schema.Schema<A, I>,
) => Stream.flatMap(readContentDirectory(directory), readContentFile(schema))

export const compileComponent = (content: string) =>
  pipe(
    Effect.promise(() => compile(content, {outputFormat: 'function-body'})),
    Effect.tryMapPromise({
      try: compiled => run(compiled, runtime as EvaluateOptions),
      catch: e => e,
    }),
    Effect.map(({default: Content}) => Content),
  )
