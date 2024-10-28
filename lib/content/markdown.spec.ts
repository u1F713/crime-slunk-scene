import path from 'node:path'
import process from 'node:process'
import {Schema} from '@effect/schema'
import {Effect} from 'effect'
import {describe, expect, test} from 'vitest'
import {compileToJsx, getContent, readFile} from './markdown.ts'

describe('@lib/markdown', () => {
  const directoryPath = path.join(process.cwd(), 'lib', 'content')
  const filePath = path.join(directoryPath, 'testing.md')

  test('compile content', async () => {
    const content = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam illum
    molestiae doloribus accusantium saepe quod voluptatem impedit quibusdam
    culpa quidem corrupti itaque nostrum recusandae, dicta repellendus iure magni.
    Facere, quos?
    `
    const compiled = await Effect.runPromise(compileToJsx(content))

    expect(compiled.cwd).toBe(process.cwd())
  })

  test('read file', async () => {
    const file = await Effect.runPromise(readFile(filePath))
    expect(Array.isArray(file)).toBeTruthy()
  })

  test('collect content', async () => {
    const content = await Effect.runPromise(
      Schema.Struct({title: Schema.String}).pipe(schema =>
        getContent(schema)(filePath),
      ),
    )

    expect(content.slug).toBe('testing')
  })
})
