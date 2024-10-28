import EntryCard from '@/features/blog/components/blog-masory/card/card.tsx'
import Mansonry from '@/features/blog/components/blog-masory/masonry/masonry.tsx'
import {getPostCollection} from '@/features/blog/utils.ts'
import {makeCloudinary} from '@/utils/cloudinary.ts'
import {Effect} from 'effect'
import type {NextPage} from 'next'

const Chronicles: NextPage = async () => {
  const posts = await Effect.runPromise(getPostCollection)
  const cloud = Effect.runSync(makeCloudinary)

  return (
    <div>
      <h1>Chronicles</h1>

      <Mansonry>
        {posts.map(e => (
          <EntryCard
            {...e.data}
            key={e.slug}
            slug={e.slug}
            image={cloud.image(e.data.image).createCloudinaryURL()}
          />
        ))}
      </Mansonry>
    </div>
  )
}

export default Chronicles
