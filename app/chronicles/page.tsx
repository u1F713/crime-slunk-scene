import {Effect} from 'effect'
import type {NextPage} from 'next'
import {makeCloudinary} from '~/utils/cloudinary.ts'
import EntryCard from './components/blog-masory/card/card.tsx'
import Mansonry from './components/blog-masory/masonry/masonry.tsx'
import {getPosts} from './utils.ts'

const Chronicles: NextPage = async () => {
  const posts = await Effect.runPromise(getPosts)
  const cloud = Effect.runSync(makeCloudinary)

  return (
    <div>
      <h1>Chronicles</h1>

      <Mansonry>
        {posts.map(e => (
          <EntryCard
            {...e.data}
            key={e.id}
            slug={e.slug}
            image={cloud.image(e.data.image).createCloudinaryURL()}
          />
        ))}
      </Mansonry>
    </div>
  )
}

export default Chronicles
