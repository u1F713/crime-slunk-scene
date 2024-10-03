import {createVar, globalStyle, style} from '@vanilla-extract/css'
import {colorschemeContract} from './themes/_colorscheme.css'

export const pageMaxWidth = createVar()

globalStyle('::selection', {
  color: `oklch(from ${colorschemeContract.accent} 1 9.54% h)`,
  backgroundColor: `oklch(from ${colorschemeContract.accent} l c h / 0.5)`,
})

export const page = style({
  background: `oklch(from ${colorschemeContract.accent} 11.49% c h)`,
  color: `oklch(from ${colorschemeContract.accent} 100% 9.54% h)`,
  vars: {
    [pageMaxWidth]: '70em',
  },
})

export const content = style({
  padding: '2em 1em',
  margin: 'auto',
  maxWidth: pageMaxWidth,
})

export const homeContainer = style({
  containerType: 'inline-size',
  maxWidth: '60em',
  margin: 'auto',
})

export const mainModule = style({
  display: 'grid',
  justifyContent: 'center',
  marginBottom: '2em',
  gap: '2em',
  '@container': {
    '(width >= 40em)': {
      gridTemplateColumns: '2fr 3fr',
    },
  },
})

export const latestPost = style({
  display: 'grid',
  gap: '2em',
  '@container': {
    '(width >= 40em)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },
})

export const footer = style({
  color: `oklch(from ${colorschemeContract.accent} 0.5 c h)`,
  padding: '2em 1em',
  margin: '2em auto 1em auto',
  maxWidth: pageMaxWidth,
})
