import {style} from '@vanilla-extract/css'

export const entityCard = style({
  padding: '1em',
  borderRadius: '3px',
  outline: '1px solid oklch(0.8 0 0 / 0.83)',
  height: '100%',
})

export const cardTitle = style({
  fontSize: '1.24em',
  marginBottom: '.4em',
  ':hover': {
    textDecoration: 'underline',
  },
})

export const coverImage = style({
  display: 'block',
  height: 'auto',
  maxWidth: '100%',
  margin: 'auto',
})

export const date = style({color: '#BCBCBC'})
