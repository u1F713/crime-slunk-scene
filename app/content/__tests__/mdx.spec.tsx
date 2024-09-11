import path from 'node:path'
import {Schema} from '@effect/schema'
import {render} from '@testing-library/react'
import {Chunk, Effect, Stream} from 'effect'
import {describe, expect, test} from 'vitest'
import {directoryStream, readFile} from '../utils.ts'

describe('content/utils', () => {
  const directory = path.join(process.cwd(), 'app', 'content', '__tests__')

  test('directoryStream: collect', async () => {
    const collected = Stream.runCollect(directoryStream(directory))
    const collection = await Effect.runPromise(collected)

    expect(Chunk.isChunk(collection)).toBe(true)
  })

  test('read file content', async () => {
    const file = path.join(directory, 'document.mdx')
    const task = readFile(file, Schema.Struct({key: Schema.String}))
    const entry = await Effect.runPromise(task)
    const Content = await entry.render()

    const {container} = render(<Content />)
    expect(container.textContent).toBe('test')
  })
})
