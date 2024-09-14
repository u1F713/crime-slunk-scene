import {Chunk, Effect, Stream, pipe} from 'effect'
import type {NextPage} from 'next'
import {getCollection} from '~/content/utils'
import * as styles from '../chronicles.css.ts'

export const generateStaticParams = () =>
  Effect.runPromise(
    pipe(
      getCollection('posts'),
      Stream.map(({slug}) => ({slug})),
      Stream.runCollect,
      Effect.map(Chunk.toArray),
    ),
  )

const Chronicle: NextPage<{params: {slug: string}}> = async ({params}) => {
  const {render, frontmatter} = await Effect.runPromise(
    pipe(
      getCollection('posts'),
      Stream.find(f => f.slug === params.slug),
      Stream.runCollect,
      Effect.flatMap(Chunk.get(0)),
    ),
  )
  const Content = await render()

  return (
    <div className={styles.article}>
      <aside className={styles.postData}>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.description}</p>
      </aside>
      <Content />
    </div>
  )
}

export const dynamicParams = false
export default Chronicle
