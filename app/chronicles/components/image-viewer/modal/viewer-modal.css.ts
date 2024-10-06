import {globalStyle, style} from '@vanilla-extract/css'
import {colorschemeContract} from '~/styles/themes/_colorscheme.css'

export const modal = style({
  height: '100dvh',
  width: '100dvw',
  maxWidth: '100%',
  maxHeight: '100%',
  outline: 'none',
  border: 'none',
  containerType: 'inline-size',
  background: `oklch(from ${colorschemeContract.accent} 0.15 c h / 0.5)`,
  backdropFilter: 'blur(20px)',
})

export const dialogImage = style({
  position: 'absolute',
  userSelect: 'none',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

export const toolbar = style({
  position: 'absolute',
  bottom: '1em',
  left: '50%',
  transform: 'translate(-50%, 0em)',
  listStyle: 'none',
  color: colorschemeContract.accent,
})

globalStyle(`${toolbar} li`, {
  cursor: 'pointer',
})
