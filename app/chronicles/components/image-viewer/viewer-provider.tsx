'use client'

import {useState} from 'react'
import {ViewerContext, type ViewerContextType} from './viewer-context.ts'

export default function ModalContextProvider({
  children,
}: {readonly children: React.ReactNode}) {
  const [image, setImage] = useState<ViewerContextType['image']>()
  return <ViewerContext value={{image, setImage}}>{children}</ViewerContext>
}
