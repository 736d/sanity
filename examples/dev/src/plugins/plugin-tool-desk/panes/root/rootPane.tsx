import {Link, useDocumentTypes} from '@sanity/base'
import React from 'react'
import styled from 'styled-components'
import {RootStructureNode} from '../../structure'

const Root = styled.div`
  background: #fff;
  padding: 1em;
  height: 100%;
  box-sizing: border-box;
`

export function RootPane(props: {node: RootStructureNode}) {
  const {node} = props
  const docTypes = useDocumentTypes()

  return (
    <Root>
      <div>
        <strong>Content: {node.path}</strong>
      </div>
      <div>
        {docTypes.map(docType => (
          <div key={docType.name}>
            <Link href={`${node.path}/${docType.name}`}>{docType.title}</Link>
          </div>
        ))}
      </div>
    </Root>
  )
}
