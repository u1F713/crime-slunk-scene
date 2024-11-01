import {createContainer, style} from '@vanilla-extract/css'

const homePageContainerName = createContainer()

export const homePageContainer = style({
  maxWidth: '50em',
  margin: '4em auto',
  containerName: homePageContainerName,
  containerType: 'inline-size',
})

export const introSect = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2em',
})
