export interface RootStructureNode {
  type: 'root'
  path: string
}

export interface DocumentTypeStructureNode {
  type: 'documentType'
  path: string
  name: string
}

export interface DocumentStructureNode {
  type: 'document'
  path: string
  id: string
}

export type StructureNode = RootStructureNode | DocumentTypeStructureNode | DocumentStructureNode
