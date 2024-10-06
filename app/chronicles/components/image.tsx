'use client'

import type {ComponentProps, FunctionComponent} from 'react'
import {useViewer} from './image-viewer/viewer-context'

interface ImgProps extends ComponentProps<'img'> {
  readonly src: string
  readonly alt: string
}

const Image: FunctionComponent<ImgProps> = ({src, alt}) => {
  const {setImage} = useViewer()

  return (
    <figure>
      <img
        src={src}
        alt={alt}
        onClick={() => setImage({src, alt})}
        onKeyDown={() => setImage(undefined)}
      />
    </figure>
  )
}

export default Image
