import {Cloudinary} from '@cloudinary/url-gen/index'
import {Config, Effect, pipe} from 'effect'
import type {Root} from 'mdast'
import {visit} from 'unist-util-visit'

export const makeCloudinary = pipe(
  Config.string('PUBLIC_CLOUDINARY_CLOUD_NAME'),
  Effect.map(cloudName => new Cloudinary({cloud: {cloudName}})),
)

export const remarkCreateCloudinaryURL = () => (tree: Root) => {
  const cloud = Effect.runSync(makeCloudinary)

  visit(tree, 'image', node => {
    node.url = cloud.image(node.url).createCloudinaryURL()
  })
}
