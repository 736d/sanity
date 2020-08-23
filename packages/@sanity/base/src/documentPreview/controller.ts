import {SanityClient} from '@sanity/client'
import {Observable, Observer} from 'rxjs'
import {SanityDocumentSchema} from '../schema'
import {State} from './types'

interface Opts {
  client: SanityClient
  id: string
  schemaType?: SanityDocumentSchema
  typeName: string
}

function buildQuery(previewSelect: Record<string, string>) {
  const entries = Object.entries(previewSelect)

  let projection = ''

  if (entries.length) {
    let fields = ''

    for (const [key, path] of entries) {
      fields += `,"${key}":${path}`
    }

    projection = `{${fields.slice(1)}}`
  }

  return `*[_id==$id]${projection}[0]`
}

export function createDocumentPreviewController(opts: Opts) {
  const {client, id, schemaType} = opts

  const previewSelect = schemaType?.preview?.select || {
    title: 'title',
    name: 'name',
    subtitle: 'subtitle',
    description: 'description'
  }

  const result$: Observable<State> = Observable.create((observer: Observer<State>) => {
    client
      .fetch(buildQuery(previewSelect), {id})
      .then(data => {
        observer.next({data, error: null, isLoaded: true, isLoading: false})
      })
      .catch(error => {
        observer.next({data: null, error, isLoaded: true, isLoading: false})
      })

    return () => {
      // dispose
    }
  })

  return {result$}
}
