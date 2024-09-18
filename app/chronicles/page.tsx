import {Chunk, Effect, Stream} from 'effect'
import type {NextPage} from 'next'
import {getCollection} from '~/content/utils.ts'
import EntryCard from './components/Card/EntryCard.tsx'
import Mansonry from './components/Masonry/Masonry.tsx'

const Chronicles: NextPage = async () => {
  const collection = await Effect.runPromise(
    Stream.runCollect(getCollection('posts')),
  )

  const list = Chunk.toReadonlyArray(collection).map(
    ({id, slug, frontmatter}) => ({
      id,
      slug,
      data: frontmatter,
    }),
  )

  return (
    <div>
      <h1>Chronicles</h1>

      <Mansonry>
        {list.map(e => (
          <EntryCard key={e.id} slug={e.slug} {...e.data} />
        ))}
      </Mansonry>
    </div>
  )
}

export default Chronicles
