import {Cloudinary} from '@cloudinary/url-gen/index'
import type {Meta, StoryObj} from '@storybook/react'
import {useEffect} from 'react'
import ViewerCanvas from './components/canvas/canvas.tsx'
import ViewerModal from './components/modal/modal.tsx'
import {ImageProvider, useImageDispatch} from './image-context.tsx'

const cloudinary = new Cloudinary({
  cloud: {cloudName: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME as string},
})
const src = cloudinary.image('Converge.webp').createCloudinaryURL()

function ModalWithCanvas() {
  const dispatch = useImageDispatch()

  useEffect(() => {
    dispatch({type: 'set_image', payload: {src}})
  }, [dispatch])

  return (
    <ViewerModal>
      <ViewerCanvas />
    </ViewerModal>
  )
}

const meta = {
  title: 'image-viewer/ModalWithCanvas',
  component: ModalWithCanvas,
  decorators: Story => (
    <ImageProvider>
      <Story />
    </ImageProvider>
  ),
} satisfies Meta<typeof ModalWithCanvas>

export const Open: StoryObj<typeof meta> = {}

export default meta
