import React from 'react'
import {DocumentPane, DocumentTypePane, RootPane} from './panes'
import {parseStructure, StructureNode} from './structure'
import {Root} from './styles'

export function DeskTool({basePath, path}: {basePath: string; path: string}) {
  const nodes = parseStructure(basePath, path)

  return (
    <Root>
      {nodes.map(node => (
        <div key={node.path}>
          <PaneResolver node={node} />
        </div>
      ))}
    </Root>
  )
}

function PaneResolver({node}: {node: StructureNode}) {
  if (node.type === 'root') {
    return <RootPane node={node} />
  }

  if (node.type === 'documentType') {
    return <DocumentTypePane node={node} />
  }

  if (node.type === 'document') {
    return <DocumentPane node={node} />
  }

  return <div>Unknown pane type: {(node as any).type}</div>
}
