'use client'

import {
  type RefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import {viewerImage} from './image-canvas.css.ts'

interface CanvasProps {
  src: string
  alt: string
}

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
  const {
    containerRef: {current: container},
    imageRef: {current: element},
  } = state

  if (!element || !container) return state

  switch (action.type === 'drag') {
    case action.payload.left < -element.clientWidth / 2:
      return {...state, left: -element.clientWidth / 2}

    case action.payload.left > container.clientWidth - element.clientWidth / 2:
      return {...state, left: container.clientWidth - element.clientWidth / 2}

    case action.payload.top < -element.clientHeight / 2:
      return {...state, top: -element.clientHeight / 2}

    case action.payload.top >
      container.clientHeight - element.clientHeight / 2:
      return {...state, top: container.clientHeight - element.clientHeight / 2}
  }

  return {...state, ...action.payload}
}

function ViewerCanvas({src, alt}: CanvasProps) {
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
        src={src}
        alt={alt}
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
