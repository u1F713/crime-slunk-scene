'use client'

import type {ComponentProps, FunctionComponent} from 'react'
import {useViewer} from './viewer/viewer-context'

interface ImgProps extends ComponentProps<'img'> {
  readonly src: string
  readonly alt: string
}

const ImageViewer: FunctionComponent<ImgProps> = ({src, alt}) => {
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

export default ImageViewer
