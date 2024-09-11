import {Chunk, Effect, Stream, pipe} from 'effect'
import type {NextPage} from 'next'
import {getCollection} from '~/content/utils'

export const generateStaticParams = async () => {
  const entries = await Effect.runPromise(
    pipe(
      Stream.runCollect(getCollection('posts')),
      Effect.map(Chunk.toReadonlyArray),
    ),
  )

  return entries.map(({slug}) => {
    slug
  })
}

const Chronicle: NextPage<{params: {slug: string}}> = async ({params}) => {
  const {render} = await Effect.runPromise(
    pipe(
      getCollection('posts'),
      Stream.find(f => f.slug === params.slug),
      Stream.runCollect,
      Effect.flatMap(Chunk.get(0)),
    ),
  )
  const Content = await render()

  return (
    <div>
      <Content />
    </div>
  )
}

export const dynamicParams = false
export default Chronicle
