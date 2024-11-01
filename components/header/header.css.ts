import {themeContract} from '@/lib/design-system/theme.css.ts'
import {style} from '@vanilla-extract/css'

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  margin: 'auto',
  maxWidth: '70rem',
  padding: '1rem',
  fontSize: '1.1em',
  position: 'sticky',
  top: 0,
  zIndex: 50,
})

export const headerAbout = style({
  fontWeight: '700',
  color: `oklch(from ${themeContract.accentColor} 0.9 c h)`,
})

export const navigation = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1em',
})

export const navigationLink = style({
  textDecoration: 'underline',

  ':hover': {
    color: `oklch(from ${themeContract.accentColor} 0.7 c h)`,
  },
})
