import type {Metadata} from 'next'
import localFont from 'next/font/local'
import Link from 'next/link'
import type {FunctionComponent} from 'react'
import * as styles from './app.css.ts'
import './global.css.ts'

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
    <body className={styles.pageWrapper}>
      <header className={styles.header}>
        <Link className={styles.homeAnchor} href="/">
          Crime Slunk Scene
        </Link>
        <nav className={styles.navigation}>
          <Link className={styles.navigationLink} href="/about">
            About
          </Link>

          <Link className={styles.navigationLink} href="/chronicles">
            Blog
          </Link>
        </nav>
      </header>
      {children}
    </body>
  </html>
)

export default RootLayout
