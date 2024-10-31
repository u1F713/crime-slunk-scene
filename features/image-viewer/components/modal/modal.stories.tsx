import {Cloudinary} from '@cloudinary/url-gen/index'
import type {Meta, StoryObj} from '@storybook/react'
import {ImageContext} from '../../image-context.tsx'
import ViewerModal from './modal.tsx'

const cloudinary = new Cloudinary({
  cloud: {cloudName: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME as string},
})
const image = cloudinary.image('Converge.webp').createCloudinaryURL()

const meta = {
  title: 'image-viewer/Modal',
  component: ViewerModal,
  decorators: Story => (
    <ImageContext value={{src: image}}>
      <Story />
    </ImageContext>
  ),
} satisfies Meta<typeof ViewerModal>

export const Open: StoryObj<typeof meta> = {
  args: {children: <span>Modal</span>},
}

export default meta
