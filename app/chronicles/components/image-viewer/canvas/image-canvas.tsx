'use client'

import {useCallback, useEffect, useRef, useState} from 'react'
import {viewerImage} from './image-canvas.css.ts'

interface CanvasProps {
  src: string
  alt: string
}

function ViewerCanvas({src, alt}: CanvasProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  const [margin, setMargin] = useState({left: 0, top: 0})
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

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

        setMargin(prev => ({left: prev.left + -x, top: prev.top + -y}))
        setPosition({x: e.clientX, y: e.clientY})
      }
    },
    [isDragging, position],
  )

  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  useEffect(() => {
    const rect = imageRef.current?.getBoundingClientRect()
    if (rect)
      setMargin({
        left: window.innerWidth / 2 - rect.width / 2,
        top: window.innerHeight / 2 - rect.height / 2,
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
      style={{height: '100%', overflow: 'clip', userSelect: 'none'}}
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
        }}
      />
    </figure>
  )
}

export default ViewerCanvas
