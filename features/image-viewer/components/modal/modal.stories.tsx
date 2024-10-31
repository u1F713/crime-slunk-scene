import {Cloudinary} from '@cloudinary/url-gen/index'
import type {Meta, StoryObj} from '@storybook/react'
import {useEffect} from 'react'
import {ImageProvider, useImageDispatch} from '../../image-context.tsx'
import ViewerModal from './modal.tsx'

const cloudinary = new Cloudinary({
  cloud: {cloudName: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME as string},
})
const src = cloudinary.image('Converge.webp').createCloudinaryURL()

function LoadImage() {
  const dispatch = useImageDispatch()

  useEffect(() => {
    dispatch({type: 'set_image', payload: {src}})
  }, [dispatch])

  return null
}

const meta = {
  title: 'image-viewer/Modal',
  component: ViewerModal,
  decorators: Story => (
    <ImageProvider>
      <Story />
      <LoadImage />
    </ImageProvider>
  ),
} satisfies Meta<typeof ViewerModal>

export const Open: StoryObj<typeof meta> = {
  args: {children: <span>Modal</span>},
}

export default meta
