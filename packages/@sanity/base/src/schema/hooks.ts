import {useContext} from 'react'
import {SchemaContext} from './context'
import {SanityDocumentSchema} from './types'

export function useSchema() {
  const schema = useContext(SchemaContext)

  if (!schema) throw new Error('missing schema in context')

  return schema
}

export function useDocumentTypes() {
  const schema = useSchema()

  return schema.filter(s => s.type === 'document') as SanityDocumentSchema[]
}

export function useDocumentType(typeName: string): SanityDocumentSchema | undefined {
  const schema = useSchema()

  return schema.filter(s => s.type === 'document').find(s => s.name === typeName)
}
