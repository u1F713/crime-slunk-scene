import CodeBlock from '@/features/blog/components/code-block/code-block.tsx'
import ViewerCanvas from '@/features/blog/components/image-viewer/canvas/image-canvas.tsx'
import ViewerModal from '@/features/blog/components/image-viewer/modal/viewer-modal.tsx'
import {ViewerProvider} from '@/features/blog/components/image-viewer/viewer-context.tsx'
import Image from '@/features/blog/components/image.tsx'
import {getPost, getPosts} from '@/features/blog/utils.ts'
import {compileComponent} from '@/utils/content-collection.ts'
import {Effect} from 'effect'
import * as styles from '../chronicles.css.ts'

interface ChronicleParams {
  slug: string
}

export const generateStaticParams = (): Promise<ChronicleParams[]> =>
  Effect.runPromise(getPosts).then(c => c.map(({slug}) => ({slug})))

async function Chronicle({params}: {params: Promise<ChronicleParams>}) {
  const {slug} = await params
  const post = await Effect.runPromise(getPost(slug))
  const Content = await Effect.runPromise(compileComponent(post.content))

  return (
    <div className={styles.article}>
      <aside className={styles.postData}>
        <h1>{post?.data.title}</h1>
        <p>{post?.data.description}</p>
      </aside>

      <ViewerProvider>
        {/* @ts-expect-error: */}
        <Content components={{img: Image, pre: CodeBlock}} />
        <ViewerModal>
          <ViewerCanvas />
        </ViewerModal>
      </ViewerProvider>
    </div>
  )
}

export const dynamicParams = false
export default Chronicle
