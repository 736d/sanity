import {useContext} from 'react'
import {UserContext} from './context'

export function useUser() {
  const user = useContext(UserContext)

  if (!user) throw new Error('missing user in context')

  return user
}
