export interface SanityDocumentSchema {
  type: 'document'
  name: string
  title: string
  preview?: {
    prepare?: (data: Record<string, string>) => Record<string, React.ReactNode>
    select?: Record<string, string>
  }
}

export type SanitySchema = SanityDocumentSchema
