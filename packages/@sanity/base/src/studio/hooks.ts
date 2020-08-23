import {useContext} from 'react'
import {StudioContext} from './context'
import {StudioToolPlugin} from './types'

export function useStudio() {
  const studio = useContext(StudioContext)

  if (studio === null) throw new Error('missing studio context')

  return studio
}

export function usePlugins() {
  return useStudio().plugins
}

export function useTools() {
  const plugins = usePlugins()

  return plugins.filter(p => p.type === 'tool') as StudioToolPlugin[]
}
