import {Chunk, Effect, Stream} from 'effect'
import type {NextPage} from 'next'
import Link from 'next/link'
import type {FunctionComponent} from 'react'
import {getCollection} from '~/content/utils.ts'
import * as styles from './chronicles.css.ts'

const EntryCard: FunctionComponent<{
  slug: string
  title: string
  pubDate: Date
  description: string
}> = props => {
  return (
    <div className={styles.entryCard}>
      <h4 className={styles.postTitle}>
        <Link href={`/chronicles/${props.slug}`}>{props.title}</Link>
      </h4>

      <p>{props.description}</p>
      <span className={styles.date}>
        {new Intl.DateTimeFormat('en-US', {dateStyle: 'full'}).format(
          props.pubDate,
        )}
      </span>
    </div>
  )
}

const Chronicles: NextPage = async () => {
  const collection = await Effect.runPromise(
    Stream.runCollect(getCollection('posts')),
  )

  return (
    <>
      <h1>Chronicles</h1>

      {Chunk.toReadonlyArray(collection).map(c => (
        <EntryCard {...c.frontmatter} slug={c.slug} key={c.id} />
      ))}
    </>
  )
}

export default Chronicles
