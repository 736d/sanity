import {SanityClient} from '@sanity/client'
import {ReplaySubject} from 'rxjs'
import {Controller, User} from './types'

export function createUserController(client: SanityClient): Controller {
  const stateSubject = new ReplaySubject<{data: User | null; error: Error | null}>(1)
  const state$ = stateSubject.asObservable()

  _init()

  return {logout, state$}

  function _init() {
    return client
      .request({
        uri: '/users/me',
        withCredentials: true
      })
      .then(user => {
        stateSubject.next({data: user && user.id ? user : null, error: null})
      })
      .catch(error => {
        if (error.statusCode === 401) {
          return
        }

        stateSubject.next({data: null, error})
      })
  }

  function logout() {
    return client.auth
      .logout()
      .then(() => {
        stateSubject.next({data: null, error: null})
      })
      .catch(error => {
        stateSubject.next({data: null, error})
      })
  }
}
