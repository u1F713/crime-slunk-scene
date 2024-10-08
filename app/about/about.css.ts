import {createContainer, style} from '@vanilla-extract/css'
import {colorschemeContract} from '~/styles/themes/_colorscheme.css'

const AboutContainerName = createContainer()

export const aboutContainer = style({
  containerType: 'inline-size',
  containerName: AboutContainerName,
})

export const aboutGrid = style({
  display: 'grid',
  gap: '2em',
  width: 'fit-content',
  margin: 'auto',

  '@container': {
    [`${AboutContainerName} (min-width: 55em)`]: {
      gridTemplateColumns: 'auto auto',
    },
  },
})

export const aboutSection = style({
  maxWidth: '42em',
})

export const aboutHeading = style({
  fontSize: '2.2rem',
  marginBottom: '0.8em',
})

export const aboutSubHeading = style({
  fontSize: '1.4em',
  marginBottom: '1em',
})

export const list = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  listStyle: 'hiragana',
  paddingLeft: '2.2rem',
  gap: '.5em',
})

export const itemListLink = style({
  color: colorschemeContract.accent,
  fontWeight: 'bold',

  ':hover': {
    color: `oklch(from ${colorschemeContract.accent} 98.49 c h)`,
  },
})
