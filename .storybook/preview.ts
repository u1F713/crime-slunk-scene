import type {Preview} from '@storybook/react'
import '~/styles/global.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'black',
      values: [
        {
          name: 'black',
          value: '#000000',
        },
        {
          name: 'blue',
          value: '#3139fb',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
