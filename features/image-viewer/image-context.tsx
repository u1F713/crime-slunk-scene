import {createContext, use} from 'react'

export type ImageState = Partial<{
  src: string
  alt: string
}>

export const ImageContext = createContext<ImageState>({})

export function useImage() {
  const image = use(ImageContext)
  return image
}
