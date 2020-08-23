import React from 'react'
import styled from 'styled-components'
import {useDocumentType} from '../schema'
import {DocumentPreviewProvider} from './provider'
import {useDocumentPreview} from './hooks'

interface DocumentPreviewProps {
  id: string
  typeName: string
}

export function DocumentPreview(
  props: DocumentPreviewProps & {
    as?: React.ElementType | keyof JSX.IntrinsicElements
  } & React.HTMLProps<HTMLDivElement>
) {
  const {id, typeName, ...restProps} = props

  return (
    <DocumentPreviewProvider id={id} typeName={typeName}>
      <Content {...restProps} />
    </DocumentPreviewProvider>
  )
}

const Root = styled.div`
  color: #999;
`

const Title = styled.div`
  font-weight: 700;
`

export function Content(
  props: {as?: React.ElementType | keyof JSX.IntrinsicElements} & React.HTMLProps<HTMLDivElement>
) {
  const preview = useDocumentPreview()
  const schemaType = useDocumentType(preview.typeName)

  if (!schemaType) {
    return <Root {...props}>Unknown type: {preview.typeName}</Root>
  }

  if (preview.isLoading || !preview.isLoaded) {
    return <Root {...props}>Loading ...</Root>
  }

  if (preview.error) {
    return <Root {...props}>Error: {preview.error.message}</Root>
  }

  const data = schemaType.preview?.prepare ? schemaType.preview.prepare(preview.data) : preview.data

  return (
    <Root {...props}>
      <Title>{data.title || <em>Untitled</em>}</Title>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Root>
  )
}
