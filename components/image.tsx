'use client'

import {useImageDispatch} from '@/features/image-viewer/image-context.tsx'
import type {ComponentProps, FunctionComponent} from 'react'

interface ImgProps extends ComponentProps<'img'> {
  readonly src: string
  readonly alt: string
}

const Image: FunctionComponent<ImgProps> = ({src, alt}) => {
  const imageDispatch = useImageDispatch()

  const setImage = () =>
    imageDispatch({type: 'set_image', payload: {src, alt}})

  return (
    <figure>
      <img src={src} alt={alt} onKeyDown={setImage} onClick={setImage} />
    </figure>
  )
}

export default Image
