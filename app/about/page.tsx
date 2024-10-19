import type {NextPage} from 'next'
import * as styles from './about.css.ts'

const AboutPage: NextPage = () => {
  return (
    <main className={styles.aboutGrid}>
      <section className={styles.aboutSection}>
        <h1 className={styles.aboutHeading}>Good for health, bad for...</h1>

        <p>
          <small>
            <em>tl;dr: Monads...</em>
          </small>
        </p>

        <p>I’m a software developer and Free software advocate.</p>

        <p>
          Like many others, I began my web development journey by learning
          Python and Flask. After experimenting with Spring Framework, I
          ultimately transitioned to Node.js.
        </p>

        <p>
          Years ago, a friend introduced me to Angular 2, sparking my interest
          in TypeScript. At the time, I was using xmonad, a dynamic window
          manager for the X Window System, written and configured in Haskell.
          While exploring various JavaScript libraries and frameworks, ReactJS
          stood out for its emphasis on functional programming, which I found
          particularly enjoyable.
        </p>

        <p>
          My first computer was an IBM ThinkPad A31, running a Debian-based
          operating system. Since then, I've been a dedicated Linux user,
          exploring various distributions like openSUSE, Fedora, void, and Arch
          Linux. Among them, Arch Linux is the one I've spent the most time
          with and am most familiar with.
        </p>

        <p>
          In 2020, inspired by the many developers and all the cool tools build
          around Nix, I embark on daily driving NixOS. While still learning the
          ropes, I'm eager to share my experiences as a web developer using
          open-source technologies.
        </p>
      </section>

      <section className={styles.aboutSection}>
        <h3 className={styles.aboutSubHeading}>What I'm up to</h3>

        <ul className={styles.list}>
          <li>
            Learning
            <a
              className={styles.itemListLink}
              href="https://effect.website/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' Effect-TS.'}
            </a>
          </li>
          <li>Reading On Revolution by Hannah Arendt.</li>
          <li>
            Playing Type Lumina;
            <a
              className={styles.itemListLink}
              href="https://meltyblood.typelumina.com/resources/img/command/meltyblood_typelumina_neco-arc_command_lists_en.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' Neco-Arc '}
            </a>
            and
            <a
              className={styles.itemListLink}
              href="https://meltyblood.typelumina.com/resources/img/command/meltyblood_typelumina_kohaku_command_lists_en.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' Kohaku.'}
            </a>
          </li>
        </ul>
      </section>
    </main>
  )
}

export default AboutPage
