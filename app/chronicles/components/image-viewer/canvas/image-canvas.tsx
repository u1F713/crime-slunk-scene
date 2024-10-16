'use client'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useViewer, useViewerDispatch} from '../viewer-context.tsx'
import {viewerImage} from './image-canvas.css.ts'

function ViewerCanvas() {
  const [isDragging, setIsDragging] = useState(false)
  const [shift, setShift] = useState({x: 0, y: 0})
  const {image, position} = useViewer()
  const viewerDispatch = useViewerDispatch()
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setShift({y: e.clientY, x: e.clientX})
      setIsDragging(true)
    },
    [],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const container = containerRef.current
      const image = imageRef.current

      if (container && image) {
        const x = position.x + -(shift.x - e.clientX)
        const y = position.y + -(shift.y - e.clientY)

        viewerDispatch({
          type: 'drag_image',
          payload: {x, y, container, image},
        })
      }

      setShift({x: e.clientX, y: e.clientY})
    },
    [shift, viewerDispatch, position],
  )

  useEffect(() => {
    const rect = imageRef.current?.getBoundingClientRect()

    if (rect && containerRef.current && imageRef.current) {
      viewerDispatch({
        type: 'drag_image',
        payload: {
          x: containerRef.current.clientWidth / 2 - rect.width / 2,
          y: containerRef.current.clientHeight / 2 - rect.height / 2,
          container: containerRef.current,
          image: imageRef.current,
        },
      })
    }
  }, [viewerDispatch])

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
          marginLeft: position.x,
          marginTop: position.y,
          visibility: containerRef.current ? 'visible' : 'hidden',
          zIndex: '-1',
        }}
      />
    </figure>
  )
}

export default ViewerCanvas
