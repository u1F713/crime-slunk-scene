import {Cloudinary} from '@cloudinary/url-gen/index'
import type {Meta, StoryObj} from '@storybook/react'
import ViewerCanvas from './components/canvas/canvas.tsx'
import ViewerModal from './components/modal/modal.tsx'
import {ImageContext} from './image-context.tsx'

const cloudinary = new Cloudinary({
  cloud: {cloudName: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME as string},
})
const src = cloudinary.image('Converge.webp').createCloudinaryURL()

function ModalWithCanvas() {
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
    <ImageContext value={{src}}>
      <Story />
    </ImageContext>
  ),
} satisfies Meta<typeof ModalWithCanvas>

export const Open: StoryObj<typeof meta> = {}

export default meta
