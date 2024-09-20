import {globalStyle} from '@vanilla-extract/css'

globalStyle('*, :after, :before', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
})

globalStyle(':root', {
  colorScheme: 'dark light',
})

globalStyle('h1', {
  fontSize: '2em',
  marginBottom: '1.2rem',
})

globalStyle('p', {
  marginBottom: '1em',
})

globalStyle('a', {
  color: 'currentcolor',
  textDecoration: 'none',
})

globalStyle('img', {
  height: 'auto',
  maxWidth: '100%',
})
