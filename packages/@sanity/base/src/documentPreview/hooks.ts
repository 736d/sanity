import {useContext} from 'react'
import {DocumentPreviewContext} from './context'

export function useDocumentPreview() {
  const doc = useContext(DocumentPreviewContext)

  if (!doc) {
    throw new Error('missing document preview in context')
  }

  return doc
}
