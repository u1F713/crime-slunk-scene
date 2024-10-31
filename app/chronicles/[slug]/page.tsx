import Image from '@/components/image.tsx'
import CodeBlock from '@/features/blog/components/code-block/code-block.tsx'
import {getPost, getPostCollection} from '@/features/blog/utils.ts'
import ViewerCanvas from '@/features/image-viewer/components/canvas/canvas.tsx'
import ViewerModal from '@/features/image-viewer/components/modal/modal.tsx'
import {ImageProvider} from '@/features/image-viewer/image-context.tsx'
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

      <ImageProvider>
        {/* @ts-expect-error: */}
        <Content components={{img: Image, pre: CodeBlock}} />
        <ViewerModal>
          <ViewerCanvas />
        </ViewerModal>
      </ImageProvider>
    </div>
  )
}

export const dynamicParams = false
export default Chronicle
