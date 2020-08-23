import {createContext} from 'react'
import {State} from './types'

export type DocumentListContextValue = State & {
  typeName: string
}

export const DocumentListContext = createContext<DocumentListContextValue | null>(null)
