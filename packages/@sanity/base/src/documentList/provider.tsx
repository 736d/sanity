import React, {useEffect, useMemo, useState} from 'react'
import {useClient} from '../sanity'
import {DocumentListContext} from './context'
import {createDocumentListController} from './controller'
import {State} from './types'

export interface DocumentListProviderProps {
  children: React.ReactNode
  typeName: string
}

export function DocumentListProvider({children, typeName}: DocumentListProviderProps) {
  const client = useClient()
  const controller = useMemo(() => createDocumentListController({client, typeName}), [typeName])
  const [state, setState] = useState<State>({
    data: null,
    error: null,
    isLoaded: false,
    isLoading: false
  })

  useEffect(() => {
    const sub = controller.result$.subscribe(setState)

    return () => {
      sub.unsubscribe()
    }
  }, [controller])

  return (
    <DocumentListContext.Provider value={{...state, typeName}}>
      {children}
    </DocumentListContext.Provider>
  )
}
