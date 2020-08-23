import {createContext} from 'react'
import {State} from './types'

export type DocumentPreviewContextValue = State & {
  id: string
  typeName: string
}

export const DocumentPreviewContext = createContext<DocumentPreviewContextValue | null>(null)
