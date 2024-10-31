'use client'

import {createContext, use, useReducer} from 'react'

export type ImageState = Partial<{
  src: string
  alt: string
}>
type ImageAction = {type: 'set_image'; payload: ImageState}
type Dispatch = React.ActionDispatch<[action: ImageAction]>

export const ImageContext = createContext<ImageState>({})
export const DispatchContext = createContext<Dispatch | undefined>(undefined)

export function ImageProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(imageReducer, {})

  return (
    <ImageContext value={state}>
      <DispatchContext value={dispatch}>{children}</DispatchContext>
    </ImageContext>
  )
}

function imageReducer(state: ImageState, action: ImageAction): ImageState {
  if (action.type === 'set_image') {
    return action.payload
  }

  return state
}

export function useImage() {
  const image = use(ImageContext)
  return image
}

export function useImageDispatch() {
  const dispatch = use(DispatchContext)
  if (!dispatch) {
    throw new Error('useImageDispatch has to be used within a ContextProvider')
  }
  return dispatch
}
