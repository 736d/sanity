import {useContext} from 'react'
import {DocumentContext} from './context'

export function useDocument() {
  const doc = useContext(DocumentContext)

  if (!doc) {
    throw new Error('missing document in context')
  }

  return doc
}
