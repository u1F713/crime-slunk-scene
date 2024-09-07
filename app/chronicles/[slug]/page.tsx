import path from 'node:path'
import {Chunk, Effect, Stream, pipe} from 'effect'
import type {NextPage} from 'next'
import {directoryStream, evaluateFile} from '~/content/utils'

const _directory = path.join(process.cwd(), 'app', 'content', 'chronicles')

export const generateStaticParams = async () => {
  const stream = Stream.flatMap(directoryStream(_directory), evaluateFile)
  const entries = await Effect.runPromise(Stream.runCollect(stream))

  return Chunk.toReadonlyArray(entries).map(({slug}) => {
    slug
  })
}

const Chronicle: NextPage<{params: {slug: string}}> = async ({params}) => {
  const collection = pipe(
    directoryStream(_directory),
    Stream.flatMap(evaluateFile),
    Stream.find(f => f.slug === params.slug),
    Stream.runCollect,
  )

  const entry = await Effect.runPromise(
    Effect.flatMap(collection, Chunk.get(0)),
  )

  const Content = await entry.evalComponent()

  return (
    <div>
      <Content />
    </div>
  )
}

export const dynamicParams = false
export default Chronicle
