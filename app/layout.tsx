import type {Metadata} from 'next'
import type {FunctionComponent} from 'react'
import './global.css.ts'

export const metadata: Metadata = {
  title: 'Crime Slunk Scene',
}

const RootLayout: FunctionComponent<{children: React.ReactNode}> = ({
  children,
}) => (
  <html lang="en">
    <body>{children}</body>
  </html>
)

export default RootLayout
