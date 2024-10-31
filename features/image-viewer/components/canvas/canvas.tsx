'use client'

import {Match} from 'effect'
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {useImage} from '../../image-context'
import styles from './canvas.module.css'

const ViewerCanvas: React.FC = () => {
  const {src, alt} = useImage()
  const [position, setPosition] = useState({left: 0, top: 0})
  const [shift, setShift] = useState({x: 0, y: 0})
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (containerRef.current && imageRef.current) {
        const left = position.left + -(shift.x - e.clientX)
        const top = position.top + -(shift.y - e.clientY)
        const containerRect = containerRef.current.getBoundingClientRect()
        const imageRect = imageRef.current.getBoundingClientRect()

        setPosition({
          left: matchEdges(left, imageRect.width, containerRect.width),
          top: matchEdges(top, imageRect.height, containerRect.height),
        })
      }
      setShift({x: e.clientX, y: e.clientY})
    },
    [position, shift],
  )

  useLayoutEffect(() => {
    if (containerRef.current && imageRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const imageRect = imageRef.current.getBoundingClientRect()

      setPosition({
        left: containerRect.width / 2 - imageRect.width / 2,
        top: containerRect.height / 2 - imageRect.height / 2,
      })
    }
  }, [])

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false)

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
  }, [isDragging, handleMouseMove])

  return (
    <figure
      onMouseDown={e => {
        setShift({x: e.clientX, y: e.clientY})
        setIsDragging(true)
      }}
      ref={containerRef}
      className={styles.container}
    >
      <img
        src={src}
        alt={alt}
        ref={imageRef}
        className={styles.image}
        style={{marginLeft: position.left, marginTop: position.top}}
        draggable="false"
      />
    </figure>
  )
}

const matchEdges = (axis: number, element: number, edge: number) =>
  Match.value({axis, element, edge}).pipe(
    Match.when({axis: axis => axis < -element / 2}, () => -element / 2),
    Match.when(
      {axis: axis => axis > edge - element / 2},
      () => edge - element / 2,
    ),
    Match.orElse(() => axis),
  )

export default ViewerCanvas
