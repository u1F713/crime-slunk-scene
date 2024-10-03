import {style} from '@vanilla-extract/css'
import {pageMaxWidth} from '~/styles/app.css'
import {colorschemeContract} from '~/styles/themes/_colorscheme.css'

export const header = style({
  position: 'sticky',
  zIndex: 99,
  top: 0,
  padding: '1em .4em 0px',
})

export const naviagtion = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1em',
  margin: 'auto',
  padding: '1em',
  borderRadius: '10px',
  background: `oklch(from ${colorschemeContract.accent} 20% c h / 50.5%)`,
  boxShadow: `inset 0 0px 1px 1px ${colorschemeContract.accent}`,
  backdropFilter: 'blur(30px)',
  maxWidth: pageMaxWidth,
})

export const homepageLink = style({
  fontWeight: 'bold',
  color: `oklch(from ${colorschemeContract.accent} calc(l + 0.2) c h)`,
})

export const link = style({
  color: `oklch(from ${colorschemeContract.accent} 75% c h)`,
  textDecoration: 'none',
  ':hover': {
    color: `oklch(from ${colorschemeContract.accent} 95% c h)`,
  },
})
