import type {Metadata} from 'next'
import localFont from 'next/font/local'
import type {FunctionComponent} from 'react'
import Header from './components/header/header.tsx'
import * as styles from './styles/app.css.ts'
import './styles/global.css'

const jetBrainsMono = localFont({
  src: [
    {path: './fonts/JetBrainsMono.ttf', style: 'normal'},
    {path: './fonts/JetBrainsMono-Italic.ttf', style: 'italic'},
  ],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Crime Slunk Scene',
}

const RootLayout: FunctionComponent<{children: React.ReactNode}> = ({
  children,
}) => (
  <html lang="en" className={jetBrainsMono.className}>
    <body className={styles.page}>
      <Header />
      <div className={styles.content}>{children}</div>
    </body>
  </html>
)

export default RootLayout
