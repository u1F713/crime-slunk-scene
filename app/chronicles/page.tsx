import {Effect} from 'effect'
import type {NextPage} from 'next'
import EntryCard from './components/Card/EntryCard.tsx'
import Mansonry from './components/Masonry/Masonry.tsx'
import {getPosts} from './utils.ts'

const Chronicles: NextPage = async () => {
  const posts = await Effect.runPromise(getPosts)

  return (
    <div>
      <h1>Chronicles</h1>

      <Mansonry>
        {posts.map(e => (
          <EntryCard key={e.id} slug={e.slug} {...e.data} />
        ))}
      </Mansonry>
    </div>
  )
}

export default Chronicles
