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
  marginBottom: '1.2rem',
})

globalStyle('p', {
  marginBottom: '1em',
})
