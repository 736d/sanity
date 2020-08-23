import {useContext} from 'react'
import {SanityContext} from './context'

export function useSanity() {
  const sanity = useContext(SanityContext)

  if (!sanity) throw new Error('missing sanity in context')

  return sanity
}

export function useClient() {
  return useSanity().client
}
