import React from 'react'
import {SchemaContext} from './context'
import {SanitySchema} from './types'

export function SchemaProvider({
  children,
  schema
}: {
  children: React.ReactNode
  schema: SanitySchema[]
}) {
  return <SchemaContext.Provider value={schema}>{children}</SchemaContext.Provider>
}
