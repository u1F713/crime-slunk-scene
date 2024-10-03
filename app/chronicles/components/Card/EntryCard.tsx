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
    <Link href={`/chronicles/${slug}`}>
      <article className={styles.entityCard}>
        <img className={styles.coverImage} src={image} alt="" />
        <br />
        <h3 className={styles.cardTitle}>{title}</h3>
        <p>{description}</p>
        <span className={styles.date}>{fmtDate(pubDate)}</span>
      </article>
    </Link>
  )
}

export default EntryCard
