'use client'

import {type ActionDispatch, createContext, use, useReducer} from 'react'

interface ViewerState {
  readonly image?: React.ComponentProps<'img'> | undefined
}

type ViewerAction = {
  type: 'update_image'
  payload: ViewerState
}

function viewerReducer(state: ViewerState, action: ViewerAction): ViewerState {
  return action.type === 'update_image' ? {...state, ...action.payload} : state
}

const ViewerContext = createContext<ViewerState | null>(null)
const ViewerDispatchContext = createContext<ActionDispatch<
  [action: ViewerAction]
> | null>(null)

export function ViewerProvider({children}: {children: React.ReactNode}) {
  const [viewer, dispatch] = useReducer(viewerReducer, {})

  return (
    <ViewerContext value={viewer}>
      <ViewerDispatchContext value={dispatch}>
        {children}
      </ViewerDispatchContext>
    </ViewerContext>
  )
}

export function useViewer() {
  const context = use(ViewerContext)
  if (!context)
    throw new Error('useViewer has to be used within a ContextProvider')

  return context
}

export function useViewerDispatch() {
  const context = use(ViewerDispatchContext)
  if (!context)
    throw new Error(
      'useViewerDispatch has to be used within a ContextProvider',
    )

  return context
}
