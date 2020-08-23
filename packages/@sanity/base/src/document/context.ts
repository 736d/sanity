import {createContext} from 'react'

export interface DocumentContextValue {
  id: string
}

export const DocumentContext = createContext<DocumentContextValue | null>(null)
