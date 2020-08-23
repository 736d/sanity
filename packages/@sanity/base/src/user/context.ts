import {createContext} from 'react'

export interface User {
  error: Error | null
  me: {
    email: string
    id: string
    name: string
    profileImage: string
    role: 'administrator'
  } | null
  logout: () => void
}

export const UserContext = createContext<User | null>(null)
