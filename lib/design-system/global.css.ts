import {globalStyle} from '@vanilla-extract/css'
import {themeContract} from './theme.css.ts'

globalStyle('body', {
  background: themeContract.background,
  color: `oklch(from ${themeContract.accentColor} 100% 9.54% h)`,
})

globalStyle('::selection', {
  color: `oklch(from ${themeContract.accentColor} 1 9.54% h)`,
  backgroundColor: `oklch(from ${themeContract.accentColor} l c h / 0.5)`,
})
