import Link from 'next/link'
import type {FunctionComponent} from 'react'
import type {Post} from '~/chronicles/post-schema.ts'
import * as styles from './EntryCard.css.ts'

const fmtDate = (date: Date | number) =>
  new Intl.DateTimeFormat('en-US', {dateStyle: 'full'}).format(date)

const EntryCard: FunctionComponent<Post & {slug: string}> = ({
  image,
  slug,
  title,
  description,
  pubDate,
}) => {
  return (
    <article className={styles.entityCard}>
      <img className={styles.coverImage} src={image} alt="" />

      <section>
        <h3 className={styles.cardTitle}>
          <Link href={`/chronicles/${slug}`}>{title}</Link>
        </h3>
        <p>{description}</p>

        <span className={styles.date}>{fmtDate(pubDate)}</span>
      </section>
    </article>
  )
}

export default EntryCard
