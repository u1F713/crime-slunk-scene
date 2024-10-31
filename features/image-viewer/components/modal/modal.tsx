import {useEffect, useRef, useState} from 'react'
import {useImage} from '../../image-context.tsx'
import styles from './modal.module.css'

interface ViewerModalProps {
  children: React.ReactElement
}

const ViewerModal: React.FC<ViewerModalProps> = ({children}) => {
  const {src} = useImage()
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (dialogRef.current) {
      src === undefined
        ? dialogRef.current.close()
        : dialogRef.current.showModal()

      setIsOpen(dialogRef.current.open)
    }
  }, [src])

  return (
    <dialog className={styles.modal} ref={dialogRef}>
      {isOpen && children}
    </dialog>
  )
}

export default ViewerModal
