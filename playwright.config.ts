import {defineConfig} from '@playwright/test'

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 4443

export default defineConfig({
  webServer: {
    command: `pnpm build && pnpm start -p ${PORT}`,
    port: PORT,
  },
  testDir: 'e2e',
  testMatch: /(.+\.)?(test|spec)\.ts/,
})
