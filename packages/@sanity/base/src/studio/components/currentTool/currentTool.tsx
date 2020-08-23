import React, {createElement} from 'react'
import {useLocation} from '../../../location'
import {useTools} from '../../hooks'
import {StudioToolPlugin} from '../../types'

export function CurrentTool() {
  const loc = useLocation()
  const tools = useTools()

  if (tools.length === 0) {
    return <div>Error: no configured tools</div>
  }

  const pathSegments = loc.path.split('/').filter(Boolean)

  let currentTool: StudioToolPlugin | undefined
  let path: string

  if (pathSegments.length === 0) {
    currentTool = tools[0]
    path = `/${pathSegments.join('/')}`
  } else {
    const [toolName] = pathSegments
    currentTool = tools.find(t => t.name === toolName)
    path = `/${pathSegments.slice(1).join('/')}`
  }

  if (!currentTool) {
    return <div>Error: no tool found at path {loc.path}</div>
  }

  return createElement(currentTool.component, {basePath: `/${currentTool.name}`, path})
}
