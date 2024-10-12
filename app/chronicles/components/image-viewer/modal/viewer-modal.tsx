'use client'

import {type FunctionComponent, useEffect, useRef} from 'react'
import {useViewer} from '../viewer-context.ts'
import * as styles from './viewer-modal.css.ts'

interface ModalProps {
  children: React.ReactNode
}

const ViewerModal: FunctionComponent<ModalProps> = ({children}) => {
  const {image, setImage} = useViewer()
  const dialog = useRef<HTMLDialogElement>(null)

  const downloadImage = async (imgSrc: string, filename: string) => {
    const blob = await fetch(imgSrc).then(res => res.blob())
    const href = URL.createObjectURL(blob)
    const anchorElement = globalThis.document.createElement('a')
    anchorElement.setAttribute('href', href)
    anchorElement.setAttribute('download', filename)
    anchorElement.click()
    URL.revokeObjectURL(href)
  }

  useEffect(() => {
    if (image !== undefined) {
      document.body.style.setProperty('overflow', 'hidden')
      dialog.current?.showModal()
    } else {
      document.body.style.removeProperty('overflow')
      dialog.current?.close()
    }
  }, [image])

  return (
    <dialog
      className={styles.modal}
      onKeyDown={e => e.key === 'Escape' && setImage(undefined)}
      ref={dialog}
      draggable="false"
    >
      {children}

      <ul className={styles.toolbar}>
        <li
          onKeyDown={undefined}
          onClick={() => image && downloadImage(image.src, image.alt)}
        >
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
