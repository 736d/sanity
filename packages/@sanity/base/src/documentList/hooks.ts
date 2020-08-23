import {useContext} from 'react'
import {DocumentListContext} from './context'

export function useDocumentList() {
  const doc = useContext(DocumentListContext)

  if (!doc) {
    throw new Error('missing document list in context')
  }

  return doc
}
