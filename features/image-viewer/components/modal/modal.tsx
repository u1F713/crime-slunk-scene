'use client'

import {useEffect, useRef, useState} from 'react'
import {useImage, useImageDispatch} from '../../image-context.tsx'
import styles from './modal.module.css'

interface ViewerModalProps {
  children: React.ReactElement
}

const ViewerModal: React.FC<ViewerModalProps> = ({children}) => {
  const {src, alt} = useImage()
  const imageDispatch = useImageDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const downloadImage = async () => {
    if (src) {
      const res = await fetch(src)

      if (res.ok) {
        const blob = await res.blob()
        const href = URL.createObjectURL(blob)
        const download = globalThis.document.createElement('a')

        download.setAttribute('href', href)
        download.setAttribute('download', alt ? alt : 'image')
        download.click()
        URL.revokeObjectURL(href)
      }
    }
  }

  useEffect(() => {
    if (src === undefined) {
      document.body.style.removeProperty('overflow')
      dialogRef.current?.close()
    } else {
      document.body.style.setProperty('overflow', 'hidden')
      dialogRef.current?.showModal()
    }
    setIsOpen(dialogRef.current?.open ?? false)
  }, [src])

  return (
    <dialog
      onKeyDown={e => {
        if (e.key === 'Escape') imageDispatch({type: 'set_image', payload: {}})
      }}
      className={styles.modal}
      ref={dialogRef}
    >
      {isOpen && children}
      <ul className={styles.toolbar}>
        <li onKeyDown={undefined} onClick={downloadImage}>
          <svg height="1em" width="1em" strokeLinejoin="round">
            <title>donwload</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.75 1V1.75V8.68934L10.7197 6.71967L11.25 6.18934L12.3107 7.25L11.7803 7.78033L8.70711 10.8536C8.31658 11.2441 7.68342 11.2441 7.29289 10.8536L4.21967 7.78033L3.68934 7.25L4.75 6.18934L5.28033 6.71967L7.25 8.68934V1.75V1H8.75ZM13.5 9.25V13.5H2.5V9.25V8.5H1V9.25V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V9.25V8.5H13.5V9.25Z"
              fill="currentColor"
            />
          </svg>
        </li>
      </ul>
    </dialog>
  )
}

export default ViewerModal
