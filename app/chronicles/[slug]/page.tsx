import CodeBlock from '@/features/blog/components/code-block/code-block.tsx'
import ViewerCanvas from '@/features/blog/components/image-viewer/canvas/image-canvas.tsx'
import ViewerModal from '@/features/blog/components/image-viewer/modal/viewer-modal.tsx'
import {ViewerProvider} from '@/features/blog/components/image-viewer/viewer-context.tsx'
import Image from '@/features/blog/components/image.tsx'
import {getPost, getPostCollection} from '@/features/blog/utils.ts'
import {Effect} from 'effect'
import * as styles from '../chronicles.css.ts'

interface ChronicleParams {
  slug: string
}

export const generateStaticParams = (): Promise<ChronicleParams[]> =>
  Effect.runPromise(getPostCollection).then(c => c.map(({slug}) => ({slug})))

async function Chronicle({params}: {params: Promise<ChronicleParams>}) {
  const {slug} = await params
  const {data, render} = await Effect.runPromise(getPost(slug))
  const Content = await render()

  return (
    <div className={styles.article}>
      <aside className={styles.postData}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
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
