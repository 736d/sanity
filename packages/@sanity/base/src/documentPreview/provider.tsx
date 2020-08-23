import React, {useEffect, useMemo, useState} from 'react'
import {useDocumentType} from '../schema'
import {useClient} from '../sanity'
import {DocumentPreviewContext} from './context'
import {createDocumentPreviewController} from './controller'
import {State} from './types'

export interface DocumentPreviewProviderProps {
  children: React.ReactNode
  id: string
  typeName: string
}

export function DocumentPreviewProvider({children, id, typeName}: DocumentPreviewProviderProps) {
  const client = useClient()
  const schemaType = useDocumentType(typeName)
  const [state, setState] = useState<State>({
    data: null,
    error: null,
    isLoaded: false,
    isLoading: false
  })
  const controller = useMemo(
    () => createDocumentPreviewController({client, id, schemaType, typeName}),
    [id, typeName]
  )

  useEffect(() => {
    const sub = controller.result$.subscribe(setState)
    return () => sub.unsubscribe()
  }, [controller])

  return (
    <DocumentPreviewContext.Provider value={{...state, id, typeName}}>
      {children}
    </DocumentPreviewContext.Provider>
  )
}
