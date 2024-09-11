import fs from 'node:fs/promises'
import path from 'node:path'
import {Schema} from '@effect/schema'
import {type EvaluateOptions, compile, run} from '@mdx-js/mdx'
import type {VFile} from '@mdx-js/mdx/internal-create-format-aware-processors'
import {Data, Effect, Stream, pipe} from 'effect'
import * as runtime from 'react/jsx-runtime'
import yaml from 'yaml'
import * as collections from './schemas.ts'

class FrontmatterNotFound extends Data.TaggedError(
  '@chronicles/FrontMatterNotFound',
)<{content: string}> {}

const compileContent = (content: string) =>
  Effect.promise(() => compile(content, {outputFormat: 'function-body'}))

const renderContent = (content: VFile) =>
  pipe(
    Effect.promise(() => run(content, runtime as EvaluateOptions)),
    Effect.map(({default: Content}) => Content),
  )

export const parseFrontmatter = <A, I>(
  content: string,
  schema: Schema.Schema<A, I>,
) =>
  Effect.gen(function* () {
    const frontmatterBlock = content.match(/---(.*?)---/s)?.[1]
    const frontmatter = frontmatterBlock
      ? yaml.parse(frontmatterBlock)
      : yield* new FrontmatterNotFound({content})

    return yield* Schema.decode(schema)(frontmatter)
  })

export const readFile = <A, I>(
  file: string,
  collection: Schema.Schema<A, I>,
) =>
  Effect.gen(function* () {
    const content = yield* Effect.promise(() => fs.readFile(file, 'utf-8'))
    const vfile = yield* compileContent(content.replace(/---(.*?)---/s, ''))
    const frontmatter = yield* parseFrontmatter(content, collection)
    const {base: id, name: slug} = path.parse(file)
    const render = () => Effect.runPromise(renderContent(vfile))

    return {id, slug, frontmatter, render}
  })

export const directoryStream = (directory: string) =>
  pipe(
    Stream.fromIterableEffect(Effect.tryPromise(() => fs.readdir(directory))),
    Stream.filter(file => /\.(mdx|md)$/.test(path.extname(file))),
    Stream.map(file => path.join(directory, file)),
  )

export const getCollection = (collection: keyof typeof collections) =>
  Stream.flatMap(
    directoryStream(path.join(process.cwd(), 'app', 'content', collection)),
    file => readFile(file, collections[collection]),
  )
