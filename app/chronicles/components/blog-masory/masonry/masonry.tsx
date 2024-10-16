'use client'

import {
  Children,
  type FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react'
import * as styles from './mansonry.css.ts'

const Masonry: FunctionComponent<{children: JSX.Element[]}> = ({children}) => {
  const [columns, setColumns] = useState<JSX.Element[][]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getColumnsLength = () => {
      const width = containerRef.current?.clientWidth
      if (!width) return 0

      switch (true) {
        case width > 1020:
          return 4
        case width > 768:
          return 3
        case width > 640:
          return 2
        default:
          return 1
      }
    }
    const updateColumns = () => {
      const length = getColumnsLength()
      const nColumns: JSX.Element[][] = Array.from({length}, () => [])

      Children.forEach(children, (c, index) => {
        nColumns[index % length].push(c)
      })
      setColumns(nColumns)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [children])

  return (
    <div className={styles.mansoryContainer} ref={containerRef}>
      <ul className={styles.mansory}>
        {columns.map((col, key) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={key} className={styles.mansoryColumn}>
            {col.map(item => (
              <li key={item.key}>{item}</li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Masonry
