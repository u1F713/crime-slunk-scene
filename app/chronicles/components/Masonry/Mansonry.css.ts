import {createContainer, style} from '@vanilla-extract/css'

const mansoryContainerName = createContainer()

export const mansoryContainer = style({
  containerName: mansoryContainerName,
  containerType: 'inline-size',
})

export const mansory = style({
  display: 'flex',
  gap: '1em',
  listStyle: 'none',
  justifyContent: 'center',
  padding: '2em 0',
})

export const mansoryColumn = style({
  display: 'flex',
  gap: '1em',
  flexDirection: 'column',
  maxWidth: '300px',
})
