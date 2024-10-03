import {createTheme, createThemeContract} from '@vanilla-extract/css'

export const colorschemeContract = createThemeContract({
  accent: null,
})

export const greenTheme = createTheme(colorschemeContract, {
  accent: 'oklch(77.26% 0.15 117.95)',
})
