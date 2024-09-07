import path from 'node:path'
import {Chunk, Effect, Stream} from 'effect'
import type {NextPage} from 'next'
import Link from 'next/link'
import {directoryStream, evaluateFile} from '~/content/utils'

const Chronicles: NextPage = async () => {
  const stream = Stream.flatMap(
    directoryStream(path.join(process.cwd(), 'app', 'content', 'chronicles')),
    evaluateFile,
  )
  const collection = await Effect.runPromise(Stream.runCollect(stream))

  return (
    <>
      {Chunk.toReadonlyArray(collection).map(c => (
        <Link href={`/chronicles/${c.slug}`} key={c.id}>
          {c.getFrontmatter().title}
        </Link>
      ))}
    </>
  )
}

export default Chronicles
