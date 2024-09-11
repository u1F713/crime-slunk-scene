import {Schema} from '@effect/schema'

export const posts = Schema.Struct({
  title: Schema.String,
  description: Schema.String,
  image: Schema.String,
  pubDate: Schema.Date,
  updatedDate: Schema.optional(Schema.Date),
})
