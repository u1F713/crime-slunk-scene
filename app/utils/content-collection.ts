import fs from 'node:fs/promises'
import path from 'node:path'
import {Schema} from '@effect/schema'
import {type Fragment, type Jsx, compile, run} from '@mdx-js/mdx'
import rehypeShiki, {type RehypeShikiOptions} from '@shikijs/rehype'
import {Effect, Stream, pipe} from 'effect'
import * as runtime_ from 'react/jsx-runtime'
import remarkUnwrapImages from 'remark-unwrap-images'
import yaml from 'yaml'

// @ts-expect-error: the automatic react runtime is untyped.
const runtime: {Fragment: Fragment; jsx: Jsx; jsxs: Jsx} = runtime_
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
    Effect.promise(() =>
      compile(content, {
        outputFormat: 'function-body',
        remarkPlugins: [remarkUnwrapImages],
        rehypePlugins: [
          [rehypeShiki, {theme: 'solarized-dark'} as RehypeShikiOptions],
        ],
      }),
    ),
    Effect.tryMapPromise({
      try: compiled => run(compiled, {...runtime}),
      catch: e => e,
    }),
    Effect.map(({default: Content}) => Content),
  )
