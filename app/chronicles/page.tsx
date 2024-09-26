import {Cloudinary} from '@cloudinary/url-gen/index'
import {Effect} from 'effect'
import type {NextPage} from 'next'
import EntryCard from './components/Card/EntryCard.tsx'
import Mansonry from './components/Masonry/Masonry.tsx'
import {getPosts} from './utils.ts'

const Chronicles: NextPage = async () => {
  const posts = await Effect.runPromise(getPosts)

  const cloud = new Cloudinary({
    cloud: {cloudName: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? ''},
  })

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
