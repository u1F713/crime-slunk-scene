import {createContainer, style} from '@vanilla-extract/css'

const heading = style({margin: '.6em 0'})
export const heading2 = style([heading, {fontSize: '1.4rem'}])
export const heading3 = style([heading, {fontSize: '2rem'}])

export const pageWrapper = style({
  padding: '0 1em',
  margin: 'auto',
  maxWidth: '70em',
})

export const header = style({
  display: 'flex',
  padding: '1em 0',
  marginBottom: '4em',
})

export const homeAnchor = style({
  fontWeight: 'bold',
  color: '#b7b7b7',
})

export const navigation = style({
  display: 'flex',
  width: 'fit-content',
  marginLeft: 'auto',
  gap: '1em',
})

export const navigationLink = style({
  color: '#bcbcbc',
  textDecoration: 'none',

  ':hover': {
    color: 'currentcolor',
  },
})

const HomeContainerName = createContainer()

export const homeContainer = style({
  containerType: 'inline-size',
  containerName: HomeContainerName,
  maxWidth: '60em',
  margin: 'auto',
})

export const mainModule = style({
  display: 'grid',
  justifyContent: 'center',
  marginBottom: '8em',
  gap: '4em',

  '@container': {
    [`${HomeContainerName} (width >= 40em)`]: {
      gridTemplateColumns: '2fr 3fr',
    },
  },
})

export const collectionList = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1em',
})
