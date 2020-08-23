import {
  DocumentListProvider,
  DocumentPreview,
  Link,
  useDocumentList,
  useDocumentType
} from '@sanity/base'
import React from 'react'
import styled from 'styled-components'
import {DocumentTypeStructureNode} from '../../structure'

const Root = styled.div`
  background: #fff;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
`

const Header = styled.div`
  padding: 1em;
`

const DocumentLink = styled(Link)`
  display: block;
  border-top: 1px solid #ddd;
  padding: 1em;
  overflow: hidden;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: #eee;
  }
`

export function DocumentTypePane(props: {node: DocumentTypeStructureNode}) {
  const {node} = props
  const schemaType = useDocumentType(node.name)

  if (!schemaType) {
    return <div>Unknown type: {node.name}</div>
  }

  return (
    <DocumentListProvider typeName={node.name}>
      <Root>
        <Header>
          <strong>{schemaType.title}</strong>
        </Header>
        <div>
          <PreviewList node={node} />
        </div>
      </Root>
    </DocumentListProvider>
  )
}

function PreviewList({node}: {node: DocumentTypeStructureNode}) {
  const list = useDocumentList()

  if (list.isLoading || !list.isLoaded) {
    return <div>Loading ...</div>
  }

  if (list.error) {
    return <div>Error: {list.error.message}</div>
  }

  if (list.data.length === 0) {
    return (
      <div>
        No documents of type <code>{list.typeName}</code>
      </div>
    )
  }

  return (
    <>
      {list.data.map(doc => {
        const url = `${node.path}/${doc._id}`

        return (
          <DocumentLink href={url} key={doc._id}>
            <DocumentPreview id={doc._id} typeName={doc._type} />
          </DocumentLink>
        )
      })}
    </>
  )
}
