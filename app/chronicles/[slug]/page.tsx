import {Effect} from 'effect'
import type {NextPage} from 'next'
import {compileComponent} from '~/utils/content-collection.ts'
import * as styles from '../chronicles.css.ts'
import ImageViewer from '../components/image-viewer/image-viewer.tsx'
import {getPost, getPosts} from '../utils.ts'

export const generateStaticParams = () =>
  Effect.runPromise(getPosts).then(c => c.map(({slug}) => ({slug})))

const Chronicle: NextPage<{params: {slug: string}}> = async ({params}) => {
  const post = await Effect.runPromise(getPost(params.slug))
  const Content = await Effect.runPromise(compileComponent(post.content))

  return (
    <div className={styles.article}>
      <aside className={styles.postData}>
        <h1>{post?.data.title}</h1>
        <p>{post?.data.description}</p>
      </aside>
      {/* @ts-expect-error: */}
      <Content components={{img: ImageViewer}} />
    </div>
  )
}

export const dynamicParams = false
export default Chronicle
