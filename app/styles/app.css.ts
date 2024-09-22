import {createVar, style} from '@vanilla-extract/css'

export const pageMaxWidth = createVar()

const heading = style({margin: '.6em 0'})
export const heading2 = style([heading, {fontSize: '1.4rem'}])
export const heading3 = style([heading, {fontSize: '2rem'}])

export const page = style({
  background: '#01010181',
  vars: {
    [pageMaxWidth]: '70em',
  },
})

export const content = style({
  padding: '2em 1em',
  margin: 'auto',
  maxWidth: pageMaxWidth,
})

export const homeContainer = style({
  containerType: 'inline-size',
  maxWidth: '60em',
  margin: 'auto',
})

export const mainModule = style({
  display: 'grid',
  justifyContent: 'center',
  marginBottom: '2em',
  gap: '2em',
  '@container': {
    '(width >= 40em)': {
      gridTemplateColumns: '2fr 3fr',
    },
  },
})

export const latestPost = style({
  display: 'grid',
  gap: '2em',
  '@container': {
    '(width >= 40em)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },
})
