import type {StorybookConfig} from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
}
export default config
