import {globalStyle} from '@vanilla-extract/css'

globalStyle('*, :after, :before', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
})

globalStyle(':root', {
  colorScheme: 'dark light',
})
