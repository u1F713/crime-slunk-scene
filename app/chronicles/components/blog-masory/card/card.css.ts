import {style} from '@vanilla-extract/css'
import {colorschemeContract} from '~/styles/themes/_colorscheme.css'

export const entityCard = style({
  borderRadius: '15px 10px 0px 10px',
  height: '100%',
  overflow: 'hidden',
  padding: '1em',
  background: `oklch(from ${colorschemeContract.accent} 20% c h / 50.5%)`,
  transition: 'transform .2s cubic-bezier(0,0,.2,1)',
  boxShadow: `0 0px 2px 1px ${colorschemeContract.accent}`,
})

export const coverImage = style({
  display: 'block',
  width: '100%',
  margin: 'auto',
  borderRadius: '10px',
})

export const cardTitle = style({
  fontSize: '1.4rem',
  lineHeight: '.9',
  marginBottom: '.4em',
})

export const date = style({color: '#BCBCBC'})
