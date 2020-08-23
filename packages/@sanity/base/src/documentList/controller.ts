import {SanityClient} from '@sanity/client'
import {Observable, Observer} from 'rxjs'
import {State} from './types'

interface Opts {
  client: SanityClient
  typeName: string
}

export function createDocumentListController(opts: Opts) {
  const {client, typeName} = opts

  const result$: Observable<State> = Observable.create((observer: Observer<State>) => {
    // initial fetch
    observer.next({data: null, error: null, isLoaded: false, isLoading: true})
    client
      .fetch(`*[_type==$typeName]{_id,_type}`, {typeName})
      .then(data => observer.next({data, error: null, isLoaded: true, isLoading: false}))
      .catch(error => observer.next({data: null, error, isLoaded: true, isLoading: false}))

    return () => {
      // dispose
    }
  })

  return {result$}
}
