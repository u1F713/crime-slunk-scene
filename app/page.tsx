import {getPosts} from '@/features/blog/utils.ts'
import {makeCloudinary} from '@/utils/cloudinary.ts'
import {Effect} from 'effect'
import type {NextPage} from 'next'
import Link from 'next/link'
import * as styles from './styles/app.css.ts'

const Home: NextPage = async () => {
  const cloud = Effect.runSync(makeCloudinary)
  const posts = await Effect.runPromise(
    Effect.map(getPosts, c =>
      c.sort((x, y) => x.data.pubDate.getTime() - y.data.pubDate.getTime()),
    ),
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
        <h1>Latest posts</h1>
        <ul className={styles.latestPost}>
          {posts.map(c => (
            <Link key={c.id} href={`/chronicles/${c.slug}`}>
              <h2>{c.data.title}</h2>
              <p>{c.data.description}</p>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
