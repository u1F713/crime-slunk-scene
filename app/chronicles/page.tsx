import {Chunk, Effect, Stream} from 'effect'
import type {NextPage} from 'next'
import Link from 'next/link'
import {getCollection} from '~/content/utils'

const Chronicles: NextPage = async () => {
  const collection = await Effect.runPromise(
    Stream.runCollect(getCollection('posts')),
  )

  return (
    <>
      {Chunk.toReadonlyArray(collection).map(c => (
        <Link href={`/chronicles/${c.slug}`} key={c.id}>
          {c.frontmatter.title}
        </Link>
      ))}
    </>
  )
}

export default Chronicles
