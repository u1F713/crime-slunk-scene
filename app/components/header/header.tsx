import Link from 'next/link'
import type {FunctionComponent} from 'react'
import * as styles from './header.css.ts'

const Header: FunctionComponent = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.naviagtion}>
        <Link className={styles.homepageLink} href="/">
          Crime Slunk Scene
        </Link>

        <ul style={{display: 'flex', gap: '1em'}}>
          <Link className={styles.link} href="/about">
            About
          </Link>
          <Link className={styles.link} href="/chronicles">
            Blog
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header
