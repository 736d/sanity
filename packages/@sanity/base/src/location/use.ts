import {useContext} from 'react'
import {LocationContext} from './context'

export function useLocation() {
  const loc = useContext(LocationContext)

  if (loc === null) {
    throw new Error('missing location in context')
  }

  return loc
}
