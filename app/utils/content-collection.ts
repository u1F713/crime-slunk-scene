import fs from 'node:fs/promises'
import path from 'node:path'
import {Schema} from '@effect/schema'
import {compile, run} from '@mdx-js/mdx'
import rehypeShiki, {type RehypeShikiOptions} from '@shikijs/rehype'
import {Effect, Stream, pipe} from 'effect'
import type {Root} from 'hast'
import * as runtime from 'react/jsx-runtime'
import remarkUnwrapImages from 'remark-unwrap-images'
import {visit} from 'unist-util-visit'
import yaml from 'yaml'
import {remarkCreateCloudinaryURL} from './cloudinary'

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
        remarkPlugins: [remarkUnwrapImages, remarkCreateCloudinaryURL],
        rehypePlugins: [
          [
            rehypeShiki,
            {
              theme: 'solarized-dark',
              addLanguageClass: true,
              tabindex: false,
            } as RehypeShikiOptions,
          ],

          () => (tree: Root) => {
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
          },
        ],
      }),
    ),
    Effect.tryMapPromise({
      try: compiled => run(compiled, runtime),
      catch: e => e,
    }),
    Effect.map(({default: Content}) => Content),
  )
