import type {FunctionComponent} from 'react'
import {viewerImage} from './image-canvas.css.ts'

interface CanvasProps {
  src: string
  alt: string
}

export const ViewerCanvas: FunctionComponent<CanvasProps> = ({src, alt}) => {
  return (
    <figure>
      <img className={viewerImage} draggable="false" src={src} alt={alt} />
    </figure>
  )
}

export default ViewerCanvas
