import {createContainer, style} from '@vanilla-extract/css'

const mansoryContainerName = createContainer()

export const mansoryContainer = style({
  containerName: mansoryContainerName,
  containerType: 'inline-size',
})

export const mansoryList = style({
  display: 'flex',
  gap: '1em',
  listStyle: 'none',
  justifyContent: 'center',
})

export const mansoryItem = style({
  display: 'flex',
  gap: '1em',
  flexDirection: 'column',
})
