'use client'

import type {FunctionComponent} from 'react'
import ViewerCanvas from './canvas/image-canvas.tsx'
import ViewerModal from './modal/viewer-modal.tsx'
import {useViewer} from './viewer-context.ts'

const ImageViewer: FunctionComponent = () => {
  const {image} = useViewer()

  return <ViewerModal>{image && <ViewerCanvas {...image} />}</ViewerModal>
}

export default ImageViewer
