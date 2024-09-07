import path from 'node:path'
import {render} from '@testing-library/react'
import {Chunk, Effect, Stream} from 'effect'
import {describe, expect, test} from 'vitest'
import {directoryStream, evaluateFile} from '../utils.ts'

describe('content/utils', () => {
  const directory = path.join(process.cwd(), 'app', 'content', '__tests__')

  test('directoryStream: collect', async () => {
    const collected = Stream.runCollect(directoryStream(directory))
    const collection = await Effect.runPromise(collected)

    expect(Chunk.isChunk(collection)).toBe(true)
  })

  test('evaluate component', async () => {
    const file = path.join(directory, 'document.mdx')
    const entry = await Effect.runPromise(evaluateFile(file))
    const Content = await entry.evalComponent()
    const result = render(<Content />)

    expect(result.container.textContent).toBe('test')
  })
})
