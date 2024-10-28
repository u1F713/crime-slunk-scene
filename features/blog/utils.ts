import path from 'node:path'
import {getContent, readDirectory} from '@/lib/content/markdown.ts'
import {Chunk, Effect, Stream, pipe} from 'effect'
import {Post} from './post-schema.ts'

const directory = readDirectory(
  path.join(process.cwd(), 'app', 'chronicles', 'posts'),
)

export const getPostCollection = pipe(
  Stream.runCollect(Stream.flatMap(directory, getContent(Post))),
  Effect.map(Chunk.toArray),
)

export const getPost = (name: string) =>
  pipe(
    Stream.flatMap(directory, getContent(Post)),
    Stream.find(f => f.slug === name),
    Stream.runCollect,
    Effect.flatMap(Chunk.get(0)),
  )
