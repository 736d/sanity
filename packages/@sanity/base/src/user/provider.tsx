import React, {useEffect, useRef, useState} from 'react'
import {useClient} from '../sanity'
import {UserContext} from './context'
import {createUserController} from './controller'
import {Controller, User} from './types'

const noop = () => undefined

export function UserProvider({children}: {children: React.ReactNode}) {
  const client = useClient()
  const controllerRef = useRef<Controller | null>(null)
  const [state, setState] = useState<{data: User | null; error: Error | null}>({
    data: null,
    error: null
  })

  useEffect(() => {
    const controller = createUserController(client)
    const sub = controller.state$.subscribe(value => {
      setState(value)
    })

    controllerRef.current = controller

    return () => sub.unsubscribe()
  }, [client])

  const logout = controllerRef.current ? controllerRef.current.logout : noop

  console.log('user', state)

  return (
    <UserContext.Provider value={{me: state.data, error: state.error, logout}}>
      {children}
    </UserContext.Provider>
  )
}
