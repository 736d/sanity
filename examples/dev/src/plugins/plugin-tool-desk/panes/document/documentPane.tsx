import React from 'react'
import {DocumentStructureNode} from '../../structure'

interface DocumentPaneProps {
  node: DocumentStructureNode
}

export function DocumentPane(props: DocumentPaneProps) {
  return <div>DocumentPane: {props.node.id}</div>
}
