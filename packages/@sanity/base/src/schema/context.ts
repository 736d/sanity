import {createContext} from 'react'
import {SanitySchema} from './types'

export const SchemaContext = createContext<SanitySchema[] | null>(null)
