import {Cloudinary} from '@cloudinary/url-gen/index'
import Link from 'next/link'
import type {FunctionComponent} from 'react'
import type {Post} from '~/chronicles/post-schema.ts'
import * as styles from './EntryCard.css.ts'

const cloud = new Cloudinary({
  cloud: {cloudName: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? ''},
})

const fmtDate = (date: Date | number) =>
  new Intl.DateTimeFormat('en-US', {dateStyle: 'full'}).format(date)

const EntryCard: FunctionComponent<Post & {slug: string}> = ({
  image,
  slug,
  title,
  description,
  pubDate,
}) => {
  const imgSrc = cloud.image(image).createCloudinaryURL()

  return (
    <article className={styles.entityCard}>
      <img className={styles.coverImage} src={imgSrc} alt="" />

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
