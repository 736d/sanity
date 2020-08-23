import styled, {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    font: 100%/1.25 sans-serif;
    margin: 0;
  }

  button, input, textarea {
    -webkit-font-smoothing: inherit;
  }
`

export const Root = styled.div`
  background: #ddd;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Navbar = styled.div`
  background: #000;
  color: #fff;
  display: flex;

  & a {
    color: inherit;
    text-decoration: none;
  }
`

export const Branding = styled.div`
  padding: 1em;
`

export const Main = styled.main`
  flex: 1;
  min-height: 0;
`

export const ToolMenu = styled.div`
  flex: 1;
  display: flex;

  & > div > a {
    display: block;
    padding: 1em;
  }
`
