import styled from 'styled-components'

export const Root = styled.div`
  height: 100%;
  display: flex;

  & > div {
    flex: 1;
    min-width: 0;
    overflow: auto;
  }

  & > div + div {
    border-left: 1px solid #ddd;
  }
`
