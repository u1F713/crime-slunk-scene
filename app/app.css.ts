import {style} from '@vanilla-extract/css'

export const pageWrapper = style({
  padding: '0 1em',
  margin: 'auto',
  maxWidth: '70em',
})

export const header = style({
  display: 'flex',
  padding: '1em 0',
  marginBottom: '2em',
})

export const homeAnchor = style({
  fontWeight: 'bold',
  color: '#b7b7b7',
})

export const navigation = style({
  display: 'flex',
  width: 'fit-content',
  marginLeft: 'auto',
  gap: '1em',
})

export const navigationLink = style({
  color: '#bcbcbc',
  textDecoration: 'none',

  ':hover': {
    color: 'currentcolor',
  },
})
