import {style} from '@vanilla-extract/css'

export const postData = style({
  marginBottom: '3em',
})

export const postTitle = style({
  fontSize: '1.24em',
  marginBottom: '.4em',
  ':hover': {
    textDecoration: 'underline',
  },
})

export const date = style({color: '#BCBCBC'})

export const article = style({
  maxWidth: '42rem',
  margin: 'auto',
})
