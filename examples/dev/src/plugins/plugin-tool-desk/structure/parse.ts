import {StructureNode} from './types'

export function parseStructure(basePath: string, path: string) {
  const segments = path.split('/').filter(Boolean)
  const nodes: StructureNode[] = [{type: 'root', path: basePath}]

  let state = 'root'
  let currentPath = basePath

  for (const segment of segments) {
    if (state === 'root') {
      currentPath += `/${segment}`
      nodes.push({type: 'documentType', name: segment, path: currentPath})
      state = 'documentType'
      continue
    }

    if (state === 'documentType') {
      currentPath += `/${segment}`
      nodes.push({type: 'document', id: segment, path: currentPath})
      state = 'document'
      continue
    }

    throw new Error(`parseStructure: unexpected state: ${state}`)
  }

  return nodes
}
