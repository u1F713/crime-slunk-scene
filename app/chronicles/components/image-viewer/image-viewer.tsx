'use client'

import {
  type ComponentProps,
  type FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react'
import * as styles from './image-viewer.css.ts'

async function downloadImage(imgSrc: string, filename: string) {
  const blob = await fetch(imgSrc).then(res => res.blob())
  const href = URL.createObjectURL(blob)
  const download = globalThis.document.createElement('a')

  download.setAttribute('href', href)
  download.setAttribute('download', filename)
  download.click()
  URL.revokeObjectURL(href)
}

type ImgProps = ComponentProps<'img'> & {
  readonly src: string
  readonly alt: string
}

const ImageViewer: FunctionComponent<ImgProps> = ({src, alt}) => {
  const [visible, setVisible] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (visible) {
      dialog.current?.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      dialog.current?.close()
      document.body.style.removeProperty('overflow')
    }
  }, [visible])

  return (
    <figure>
      <img
        src={src}
        alt={alt}
        onClick={() => setVisible(prev => !prev)}
        onKeyDown={() => setVisible(prev => !prev)}
      />

      <dialog
        className={styles.modal}
        ref={dialog}
        onClick={event =>
          event.currentTarget === event.target
            ? setVisible(prev => !prev)
            : undefined
        }
        onKeyDown={event =>
          event.key === 'Escape' ? setVisible(false) : undefined
        }
      >
        <img className={styles.dialogImage} src={src} alt={alt} />

        <ul className={styles.toolbar}>
          <li onKeyDown={undefined} onClick={() => downloadImage(src, alt)}>
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
    </figure>
  )
}

export default ImageViewer
