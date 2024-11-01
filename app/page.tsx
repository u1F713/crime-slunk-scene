import {getPostCollection} from '@/features/blog/utils.ts'
import {makeCloudinary} from '@/utils/cloudinary.ts'
import {Effect} from 'effect'
import type {NextPage} from 'next'
import * as styles from './page.css.ts'

const Home: NextPage = async () => {
  const cloud = Effect.runSync(makeCloudinary)
  const posts = await Effect.runPromise(
    Effect.map(getPostCollection, c =>
      c.sort((x, y) => x.data.pubDate.getTime() - y.data.pubDate.getTime()),
    ),
  )

  return (
    <main className={styles.homePageContainer}>
      <section className={styles.introSect}>
        <div>
          <h1>Those Who Dwell in Shadows</h1>
          <p>
            "The shrine isn't a good place for using magic. It needs someplace
            more ominous."
          </p>
          <p>
            I like web development and Linux, I may end writing about retro
            games, too.
          </p>
        </div>
        <figure style={{display: 'flex', justifyContent: 'center'}}>
          <img
            src={cloud.image('homepage_picture.webp').createCloudinaryURL()}
            width={250}
            alt=""
          />
        </figure>
      </section>
    </main>
  )
}

export default Home
