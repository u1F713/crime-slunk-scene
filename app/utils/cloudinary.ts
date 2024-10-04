import {Cloudinary} from '@cloudinary/url-gen/index'
import {Config, Effect, pipe} from 'effect'

export const makeCloudinary = pipe(
  Config.string('PUBLIC_CLOUDINARY_CLOUD_NAME'),
  Effect.map(cloudName => new Cloudinary({cloud: {cloudName}})),
)
