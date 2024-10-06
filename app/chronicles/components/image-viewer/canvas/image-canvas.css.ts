import {style} from '@vanilla-extract/css'

export const viewerImage = style({
  position: 'absolute',
  userSelect: 'none',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})
