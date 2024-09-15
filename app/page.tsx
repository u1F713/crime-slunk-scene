import {Chunk, Effect, Stream} from 'effect'
import type {NextPage} from 'next'
import Link from 'next/link'
import * as styles from './app.css.ts'
import {getCollection} from './content/utils.ts'

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
    <>
      <main>
        <h1>Those Who Dwell in Shadows</h1>
        <p>
          "The shrine isn't a good place for using magic. <br />
          It needs someplace more ominous."
        </p>
        <p>I'm web developer with focus on React and SolidJS.</p>
      </main>

      <div>
        <h3 className={styles.heading3}>Latest posts</h3>

        <ul className={styles.collectionList}>
          {collection.map(c => (
            <Link key={c.id} href={`/chronicles/${c.slug}`}>
              <h2>{c.frontmatter.title}</h2>
              <p>{c.frontmatter.description}</p>
            </Link>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Home
