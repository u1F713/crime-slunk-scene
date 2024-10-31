import {Cloudinary} from '@cloudinary/url-gen/index'
import type {Meta, StoryObj} from '@storybook/react'
import {ImageContext} from '../../image-context.tsx'
import ViewerCanvas from './canvas.tsx'

const cloudinary = new Cloudinary({
  cloud: {cloudName: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME as string},
})
const imageURL = cloudinary.image('Converge.webp').createCloudinaryURL()

const meta = {
  title: 'image-viewer/Canvas',
  component: ViewerCanvas,
  decorators: Story => (
    <ImageContext value={{src: imageURL}}>
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
        }}
      >
        <Story />
      </div>
    </ImageContext>
  ),
} satisfies Meta<typeof ViewerCanvas>

export const Default: StoryObj<typeof meta> = {}
export default meta
