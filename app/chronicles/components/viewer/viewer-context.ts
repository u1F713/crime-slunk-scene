import {type Dispatch, type SetStateAction, createContext, use} from 'react'

export interface ViewerContextType {
  readonly image: {src: string; alt: string} | undefined
  readonly setImage: Dispatch<
    SetStateAction<ViewerContextType['image'] | undefined>
  >
}

export const ViewerContext = createContext<ViewerContextType | null>(null)

export function useViewer() {
  const context = use(ViewerContext)

  if (!context)
    throw new Error('useModal has to be used within a ContextProvider')
  return context
}
