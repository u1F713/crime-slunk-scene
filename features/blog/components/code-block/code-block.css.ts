import {globalStyle, style} from '@vanilla-extract/css'
import {colorschemeContract} from '~/styles/themes/_colorscheme.css.ts'

export const containerClassName = style({
  borderRadius: '0 10px 10px 10px',
  overflow: 'hidden',
  marginBottom: '1em',
})

export const codeBlockClassName = style({
  padding: '1em',
  overflowX: 'auto',
  outline: 'none',
})

export const fileLableClassName = style({
  padding: '0.5em 0.8em',
  borderRadius: '0 0 8px 0',
  background: `oklch(from ${colorschemeContract.accent} 11.49% c h)`,
})

export const copyBtnClassName = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0.5em 0.8em',
  cursor: 'pointer',
  color: 'currentcolor',
  background: 'none',
  border: 'none',
  outline: 'none',

  ':hover': {
    color: 'white',
  },
})

globalStyle(`${codeBlockClassName}:not([data-hide-line-numbers]) code`, {
  display: 'block',
  counterReset: 'line 0',
  counterIncrement: 'line 0',
})

globalStyle(
  `${codeBlockClassName}:not([data-hide-line-numbers]) code .line::before`,
  {
    display: 'inline-block',
    content: 'counter(line)',
    counterIncrement: 'line',
    width: '1em',
    marginRight: '1.5em',
    color: 'currentcolor',
  },
)
