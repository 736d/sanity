import {SanitySchema} from '@sanity/base'

const author: SanitySchema = {
  type: 'document',
  name: 'author',
  title: 'Author',
  preview: {
    select: {
      title: 'name',
      // awards: 'awards',
      // relatedAuthors: 'relatedAuthors',
      media: 'image.asset->'
      // lastUpdated: '_updatedAt'
    }
  }
}

const post: SanitySchema = {
  type: 'document',
  name: 'post',
  title: 'Post'
}

export const schema = [author, post]
