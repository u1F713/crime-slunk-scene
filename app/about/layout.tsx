import type {NextPage} from 'next'
import {aboutContainer} from './about.css.ts'

const AboutLayout: NextPage<{children: JSX.Element}> = ({children}) => (
  <div className={aboutContainer}>{children}</div>
)

export default AboutLayout
