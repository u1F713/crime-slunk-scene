'use client'

import {
  type FunctionComponent,
  type MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import {viewerImage} from './image-canvas.css.ts'

interface CanvasProps {
  src: string
  alt: string
}

export const ViewerCanvas: FunctionComponent<CanvasProps> = ({src, alt}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  const [offset, setOffset] = useState({x: 0, y: 0})
  const elementRef = useRef<HTMLImageElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove: MouseEventHandler<HTMLImageElement> = e => {
    if (isDragging)
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      })
  }

  useEffect(() => {
    const rect = elementRef.current?.getBoundingClientRect()
    if (rect)
      setPosition({
        x: window.innerWidth / 2 - rect.width / 2,
        y: window.innerHeight / 2 - rect.height / 2,
      })
  }, [])

  return (
    <figure>
      <img
        className={viewerImage}
        draggable="false"
        ref={elementRef}
        src={src}
        alt={alt}
        onKeyDown={undefined}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          visibility: elementRef.current ? 'visible' : 'hidden',
        }}
      />
    </figure>
  )
}

export default ViewerCanvas
