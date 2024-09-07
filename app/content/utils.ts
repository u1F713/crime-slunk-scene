import fs from 'node:fs/promises'
import path from 'node:path'
import {type EvaluateOptions, compile, run} from '@mdx-js/mdx'
import {Data, Effect, Layer, ManagedRuntime, Stream, pipe} from 'effect'
import * as runtime from 'react/jsx-runtime'
import yaml from 'yaml'

class FrontmatterNotFound extends Data.TaggedError(
  '@chronicles/FrontMatterNotFound',
)<{file: string}> {}

export const parseFrontmatter = (fileContent: string) =>
  Effect.gen(function* () {
    const frontmatterBlock = fileContent.match(/---(.+?)---/s)?.[1]

    return frontmatterBlock === undefined
      ? yield* new FrontmatterNotFound({file: fileContent})
      : yaml.parse(frontmatterBlock)
  })

export const evaluateFile = (file: string) =>
  Effect.gen(function* () {
    const content = yield* Effect.promise(() => fs.readFile(file, 'utf-8'))
    const vfile = yield* Effect.tryPromise(() =>
      compile(content.replace(/---(.+?)---/s, ''), {
        outputFormat: 'function-body',
      }),
    )
    const effectRuntime = ManagedRuntime.make(Layer.empty)

    return {
      id: path.parse(file).base,
      slug: path.parse(file).name,
      getFrontmatter: () => effectRuntime.runSync(parseFrontmatter(content)),
      evalComponent: () =>
        run(vfile, runtime as EvaluateOptions).then(_ => _.default),
    }
  })

export const directoryStream = (directory: string) =>
  pipe(
    Stream.fromIterableEffect(Effect.tryPromise(() => fs.readdir(directory))),
    Stream.filter(file => /\.(mdx|md)$/.test(path.extname(file))),
    Stream.map(file => path.join(directory, file)),
  )
