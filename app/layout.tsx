import Header from '@/components/header/header.tsx'
import type {Metadata} from 'next'
import localFont from 'next/font/local'
import type {FunctionComponent} from 'react'
import * as styles from './styles/app.css.ts'
import {greenTheme} from './styles/themes/_colorscheme.css.ts'
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
    <body className={`${styles.page} ${greenTheme}`}>
      <Header />
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <a
          href="https://www.gnu.org/licenses/gpl-3.0.en.html"
          target="_blank"
          rel="noopener noreferrer license"
        >
          GPL-3.0
        </a>
        <span> {new Date().getFullYear()} &copy; </span>
        <a
          href="https://github.com/u1F713"
          target="_blank"
          rel="noopener noreferrer"
        >
          u1F713
        </a>
      </footer>
    </body>
  </html>
)

export default RootLayout
