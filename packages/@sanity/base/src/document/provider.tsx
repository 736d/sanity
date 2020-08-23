import React from 'react'
import {DocumentContext} from './context'
import {createDocumentController} from './controller'

export interface DocumentProviderProps {
  children: React.ReactNode
  id: string
}

export function DocumentProvider({children, id}: DocumentProviderProps) {
  const controller = createDocumentController()

  return <DocumentContext.Provider value={{...controller, id}}>{children}</DocumentContext.Provider>
}
