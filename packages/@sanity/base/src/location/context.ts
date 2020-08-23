import {createContext} from 'react'
import {LocationInterface} from './types'

export const LocationContext = createContext<LocationInterface | null>(null)
