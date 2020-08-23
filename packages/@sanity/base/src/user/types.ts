import {Observable} from 'rxjs'

export interface User {
  email: string
  id: string
  name: string
  profileImage: string
  role: 'administrator'
}

export interface Controller {
  logout: () => void
  state$: Observable<{data: User | null; error: Error | null}>
}
