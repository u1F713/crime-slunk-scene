import {glassSurfaces} from '@/lib/design-system/surfaces.css.ts'
import Link from 'next/link'
import type {FunctionComponent} from 'react'
import * as styles from './header.css.ts'

const Header: FunctionComponent = () => {
  return (
    <header className={`${styles.header} ${glassSurfaces}`}>
      <Link href="/">
        <div className={styles.headerAbout}>Crime Slunk Scene</div>
      </Link>

      <nav className={styles.navigation}>
        <Link className={styles.navigationLink} href="/chronicles">
          Blog
        </Link>
        <Link className={styles.navigationLink} href="/projects">
          Projects
        </Link>
      </nav>
    </header>
  )
}

export default Header
