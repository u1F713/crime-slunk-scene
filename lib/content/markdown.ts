import fs from 'node:fs/promises'
import path from 'node:path'
import {remarkCreateCloudinaryURL} from '@/utils/cloudinary'
import {Schema} from '@effect/schema'
import {compile, run} from '@mdx-js/mdx'
import rehypeShiki, {type RehypeShikiOptions} from '@shikijs/rehype'
import {Effect, Runtime, Stream, pipe} from 'effect'
import type {Root} from 'hast'
import * as runtime from 'react/jsx-runtime'
import remarkUnwrapImages from 'remark-unwrap-images'
import {visit} from 'unist-util-visit'
import yaml from 'yaml'

export const compileToJsx = (content: string) =>
  Effect.gen(function* () {
    const runSync = Runtime.runSync(yield* Effect.runtime<never>())

    const parseMetaString: RehypeShikiOptions['parseMetaString'] = meta =>
      runSync(foldMetaString(meta))

    const rehypeOptions: RehypeShikiOptions = {
      theme: 'solarized-dark',
      addLanguageClass: true,
      tabindex: false,
      parseMetaString,
    }

    return yield* Effect.promise(() =>
      compile(content, {
        outputFormat: 'function-body',
        remarkPlugins: [remarkUnwrapImages, remarkCreateCloudinaryURL],
        rehypePlugins: [
          [rehypeShiki, rehypeOptions],
          remarkDataLanguagePlugin,
        ],
      }),
    )
  })

export const readFile = (filePath: string) =>
  Effect.gen(function* () {
    const file = yield* Effect.promise(() => fs.readFile(filePath, 'utf-8'))
    const list = file.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

    return Array.isArray(list)
      ? list.slice(1)
      : yield* Effect.fail(new Error())
  })

export const renderComponent = (code: {toString(): string}) =>
  pipe(
    Effect.promise(() => run(code, runtime)),
    Effect.map(c => c.default),
  )

export const getContent =
  <A, I>(schema: Schema.Schema<A, I>) =>
  (filePath: string) =>
    Effect.gen(function* () {
      const [frontmatter, content] = yield* readFile(filePath)
      const compiled = yield* compileToJsx(content)
      const {name: slug} = path.parse(filePath)
      const runPromise = Runtime.runPromise(yield* Effect.runtime<never>())

      return {
        slug,
        data: yield* Schema.decode(schema)(yaml.parse(frontmatter)),
        render: () => runPromise(renderComponent(compiled)),
      }
    })

export const readDirectory = (directoryPath: string) =>
  Effect.promise(() => fs.readdir(directoryPath)).pipe(
    Stream.fromIterableEffect,
    Stream.filter(file => /\.(mdx|md)$/.test(path.extname(file))),
    Stream.map(file => path.join(directoryPath, file)),
  )

export const foldMetaString = (metaString: string) =>
  pipe(
    Stream.fromIterable(metaString.split(' ')),
    Stream.runFold<Record<string, string>, string>({}, (x, y) => {
      const [k, v] = y.split('=')
      return {...x, [`data-${k}`]: v}
    }),
  )

export const remarkDataLanguagePlugin = () => (tree: Root) =>
  visit(tree, 'element', (node, _, parent) => {
    if (
      parent?.type === 'element' &&
      parent.tagName === 'pre' &&
      node.tagName === 'code' &&
      Array.isArray(node.properties?.class) &&
      typeof node.properties.class[0] === 'string'
    ) {
      const lang = node.properties.class[0]

      parent.properties = {
        ...parent.properties,
        'data-language': lang.match(/language-(.*)/)?.[1],
      }

      node.properties.class = null
    }
  })
