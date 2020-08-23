import {SanityClient} from '@sanity/client'
import {createContext} from 'react'

export interface Sanity {
  client: SanityClient
  dataset: string
  projectId: string
}

export const SanityContext = createContext<Sanity | null>(null)
