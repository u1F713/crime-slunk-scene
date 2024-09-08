import type {NextPage} from 'next'
import Link from 'next/link'

const Home: NextPage = () => (
  <main>
    <h1>Those Who Dwell in Shadows</h1>
    <p>
      "The shrine isn't a good place for using magic. It needs someplace more
      ominous."
    </p>
    <p>I'm web developer with focus on React and SolidJS.</p>

    <Link href="/chronicles">Blog</Link>
  </main>
)

export default Home
