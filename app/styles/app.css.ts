import {createVar, style} from '@vanilla-extract/css'
import {colorschemeContract} from './themes/_colorscheme.css'

export const pageMaxWidth = createVar()

export const page = style({
  vars: {
    [pageMaxWidth]: '70em',
  },
})

export const content = style({
  padding: '2em 1em',
  margin: 'auto',
  maxWidth: pageMaxWidth,
})

export const footer = style({
  color: `oklch(from ${colorschemeContract.accent} 0.5 c h)`,
  padding: '2em 1em',
  margin: '2em auto 1em auto',
  maxWidth: pageMaxWidth,
})
