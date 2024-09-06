import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import {defaultExclude, defineConfig} from 'vitest/config'

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), tsconfigPaths()],
  test: {
    environment: 'happy-dom',
    exclude: [...defaultExclude, '**/e2e/**'],
  },
})
