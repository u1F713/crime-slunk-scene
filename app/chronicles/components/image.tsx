'use client'

import type {ComponentProps, FunctionComponent} from 'react'
import {useViewerDispatch} from './image-viewer/viewer-context.tsx'

interface ImgProps extends ComponentProps<'img'> {
  readonly src: string
  readonly alt: string
}

const Image: FunctionComponent<ImgProps> = ({src, alt}) => {
  const viewerDispatch = useViewerDispatch()

  const setImage = () =>
    viewerDispatch({type: 'update_image', payload: {image: {src, alt}}})

  return (
    <figure>
      <img src={src} alt={alt} onKeyDown={setImage} onClick={setImage} />
    </figure>
  )
}

export default Image
