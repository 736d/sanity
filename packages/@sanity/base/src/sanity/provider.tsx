import createClient from '@sanity/client'
import React from 'react'
import {SanityContext} from './context'

interface SanityProviderProps {
  children: React.ReactNode
  dataset: string
  projectId: string
}

export function SanityProvider({children, dataset, projectId}: SanityProviderProps) {
  const client = createClient({dataset, projectId})

  return (
    <SanityContext.Provider value={{client, dataset, projectId}}>{children}</SanityContext.Provider>
  )
}
