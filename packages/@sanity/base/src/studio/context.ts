import {createContext} from 'react'
import {StudioPlugin} from './types'

export interface StudioContextInterface {
  plugins: StudioPlugin[]
}

export const StudioContext = createContext<StudioContextInterface | null>(null)
