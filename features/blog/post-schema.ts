import {Schema} from '@effect/schema'

export type Post = typeof Post.Type

export const Post = Schema.Struct({
  title: Schema.String,
  description: Schema.String,
  image: Schema.String,
  pubDate: Schema.Date,
  updatedDate: Schema.optional(Schema.Date),
})
