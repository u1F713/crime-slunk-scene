'use client'

import {Match} from 'effect'
import {
  type RefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import {useViewer} from '../viewer-context.tsx'
import {viewerImage} from './image-canvas.css.ts'

interface ImagePositionState {
  left: number
  top: number
  containerRef: RefObject<HTMLElement | null>
  imageRef: RefObject<HTMLImageElement | null>
}

function dragImageReducer(
  state: ImagePositionState,
  action: {type: 'drag'; payload: {left: number; top: number}},
): ImagePositionState {
  if (!state.containerRef.current || !state.imageRef.current) return state

  const container = state.containerRef.current
  const element = state.imageRef.current
  const {left, top} = action.payload

  const match = (position: number, element: number, edge: number) =>
    Match.value({position, element, edge}).pipe(
      Match.when(
        {position: position => position < -element / 2},
        () => -element / 2,
      ),
      Match.when(
        {position: position => position > edge - element / 2},
        () => edge - element / 2,
      ),
      Match.orElse(() => position),
    )

  return {
    ...state,
    left: match(left, element.clientWidth, container.clientWidth),
    top: match(top, element.clientHeight, container.clientHeight),
  }
}

function ViewerCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  const [margin, dispatch] = useReducer(dragImageReducer, {
    left: 0,
    top: 0,
    containerRef,
    imageRef,
  })

  const {image} = useViewer()

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setPosition({y: e.clientY, x: e.clientX})
      setIsDragging(true)
    },
    [],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const x = position.x - e.clientX
        const y = position.y - e.clientY

        dispatch({
          type: 'drag',
          payload: {...margin, left: margin.left + -x, top: margin.top + -y},
        })
        setPosition({x: e.clientX, y: e.clientY})
      }
    },
    [isDragging, position, margin],
  )

  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  useEffect(() => {
    const rect = imageRef.current?.getBoundingClientRect()

    if (rect && containerRef.current)
      dispatch({
        type: 'drag',
        payload: {
          left: containerRef.current.clientWidth / 2 - rect.width / 2,
          top: containerRef.current.clientHeight / 2 - rect.height / 2,
        },
      })
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <figure
      onMouseDown={handleMouseDown}
      ref={containerRef}
      style={{
        height: '100%',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      <img
        src={image?.src}
        alt={image?.alt}
        ref={imageRef}
        className={viewerImage}
        draggable="false"
        style={{
          marginLeft: margin.left,
          marginTop: margin.top,
          visibility: containerRef.current ? 'visible' : 'hidden',
          zIndex: '-1',
        }}
      />
    </figure>
  )
}

export default ViewerCanvas
