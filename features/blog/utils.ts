import path from 'node:path'
import {getCollection} from '@/utils/content-collection.ts'
import {Chunk, Effect, Stream, pipe} from 'effect'
import {Post} from './post-schema.ts'

export const getPosts = Effect.gen(function* () {
  const directory = path.join(process.cwd(), 'app', 'chronicles', 'posts')
  const posts = getCollection(directory, Post)
  const collection = yield* Stream.runCollect(posts)

  return Chunk.toArray(collection)
})

export const getPost = (name: string) =>
  pipe(
    path.join(process.cwd(), 'app', 'chronicles', 'posts'),
    directory => getCollection(directory, Post),
    Stream.find(f => f.slug === name),
    Stream.runCollect,
    Effect.flatMap(Chunk.get(0)),
  )
