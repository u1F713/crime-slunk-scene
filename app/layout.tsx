import type {Metadata} from 'next'
import localFont from 'next/font/local'
import type {FunctionComponent} from 'react'
import './global.css.ts'

const monaspaceNeon = localFont({
  src: './assets/MonaspaceNeonVF.ttf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Crime Slunk Scene',
}

const RootLayout: FunctionComponent<{children: React.ReactNode}> = ({
  children,
}) => (
  <html lang="en" className={monaspaceNeon.className}>
    <body>{children}</body>
  </html>
)

export default RootLayout
