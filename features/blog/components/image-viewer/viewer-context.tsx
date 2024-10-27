'use client'

import {Match} from 'effect'
import {type ActionDispatch, createContext, use, useReducer} from 'react'

interface ViewerState {
  readonly image?: React.ComponentProps<'img'> | undefined
  readonly position: {x: number; y: number}
}

type ViewerAction =
  | {
      type: 'update_image'
      payload: {image: ViewerState['image']}
    }
  | {
      type: 'drag_image'
      payload: {
        x: number
        y: number
        container: HTMLDivElement
        image: HTMLImageElement
      }
    }

function viewerReducer(state: ViewerState, action: ViewerAction): ViewerState {
  if (action.type === 'drag_image') {
    const {x, y, container, image} = action.payload

    const matchEdges = (axis: number, element: number, edge: number) =>
      Match.value({axis, element, edge}).pipe(
        Match.when({axis: axis => axis < -element / 2}, () => -element / 2),
        Match.when(
          {axis: axis => axis > edge - element / 2},
          () => edge - element / 2,
        ),
        Match.orElse(() => axis),
      )

    return {
      ...state,
      position: {
        x: matchEdges(x, image.clientWidth, container.clientWidth),
        y: matchEdges(y, image.clientHeight, container.clientHeight),
      },
    }
  }

  return action.type === 'update_image' ? {...state, ...action.payload} : state
}

const ViewerContext = createContext<ViewerState | null>(null)
const ViewerDispatchContext = createContext<ActionDispatch<
  [action: ViewerAction]
> | null>(null)

export function ViewerProvider({children}: {children: React.ReactNode}) {
  const [viewer, dispatch] = useReducer(viewerReducer, {
    position: {x: 0, y: 0},
  })

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
