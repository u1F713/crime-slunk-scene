import {style} from '@vanilla-extract/css'
import {pageMaxWidth} from '~/styles/app.css'

export const header = style({
  position: 'sticky',
  padding: '1em',
  background: '#01010181',
  backdropFilter: 'blur(23px)',
  boxShadow: '0 1px #23252a',
  zIndex: 99,
  top: 0,
})

export const naviagtion = style({
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: pageMaxWidth,
  margin: 'auto',
  gap: '1em',
})

export const homepageLink = style({
  fontWeight: 'bold',
  color: '#b7b7b7',
})

export const link = style({
  color: '#bcbcbc',
  textDecoration: 'none',
  ':hover': {
    color: 'currentcolor',
  },
})
