import {Cloudinary} from '@cloudinary/url-gen/index'
import {Chunk, Effect, Stream} from 'effect'
import type {NextPage} from 'next'
import Link from 'next/link'
import {getCollection} from './content/utils.ts'
import * as styles from './styles/app.css.ts'

const cloud = new Cloudinary({
  cloud: {cloudName: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? ''},
})

const Home: NextPage = async () => {
  const collection = await getCollection('posts').pipe(
    Stream.runCollect,
    Effect.map(Chunk.toArray),
    Effect.map(c =>
      c.sort(
        (x, y) =>
          x.frontmatter.pubDate.getTime() - y.frontmatter.pubDate.getTime(),
      ),
    ),
    Effect.map(c => c.slice(-4)),
    Effect.map(c => c.reverse()),
    Effect.runPromise,
  )

  return (
    <div className={styles.homeContainer}>
      <main className={styles.mainModule}>
        <figure style={{display: 'flex', justifyContent: 'center'}}>
          <img
            src={cloud.image('homepage_picture.webp').createCloudinaryURL()}
            width={250}
            alt=""
          />
        </figure>

        <section>
          <h1>Those Who Dwell in Shadows</h1>
          <p>
            "The shrine isn't a good place for using magic. It needs someplace
            more ominous."
          </p>
          <p>
            I like web development and Linux, I may end writing about retro
            games, too.
          </p>
        </section>
      </main>

      <div>
        <h3 className={styles.heading3}>Latest posts</h3>
        <ul className={styles.latestPost}>
          {collection.map(c => (
            <Link key={c.id} href={`/chronicles/${c.slug}`}>
              <h2 className={styles.heading2}>{c.frontmatter.title}</h2>
              <p>{c.frontmatter.description}</p>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
