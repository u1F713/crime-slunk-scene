import {style} from '@vanilla-extract/css'
import {themeContract} from './theme.css'

export const glassSurfaces = style({
  background: `oklch(from ${themeContract.background} l c h / 0.6)`,
  backdropFilter: 'blur(12px)',
})
