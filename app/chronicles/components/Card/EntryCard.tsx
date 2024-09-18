import {Cloudinary} from '@cloudinary/url-gen/index'
import Link from 'next/link'
import type {FunctionComponent} from 'react'
import type {posts} from '~/content/schemas.ts'
import * as styles from './EntryCard.css.ts'

const cloud = new Cloudinary({
  cloud: {cloudName: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? ''},
})

const EntryCard: FunctionComponent<
  typeof posts.Type & {slug: string}
> = props => {
  return (
    <div className={styles.entityCard}>
      <img
        src={cloud.image(props.image).createCloudinaryURL()}
        width={200}
        alt=""
      />

      <h4 className={styles.cardTitle}>
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

export default EntryCard
