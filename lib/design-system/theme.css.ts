import {createTheme, createThemeContract} from '@vanilla-extract/css'

export const themeContract = createThemeContract({
  accentColor: null,
  background: null,
})

export const blueTheme = createTheme(themeContract, {
  accentColor: 'oklch(33.81% 0.0669 270.02)',
  background: 'oklch(6.76% 0.0468 264.06)',
})
