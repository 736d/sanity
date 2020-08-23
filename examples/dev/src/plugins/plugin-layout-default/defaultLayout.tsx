import {CurrentTool, Link, useTools, useUser} from '@sanity/base'
import React from 'react'
import {Branding, GlobalStyle, Main, Navbar, Root, ToolMenu} from './styles'

export function DefaultLayout() {
  const tools = useTools()
  const user = useUser()

  return (
    <>
      <GlobalStyle />
      <Root>
        <Navbar>
          <Branding>
            <Link href="/">Sanity Studio</Link>
          </Branding>

          <ToolMenu>
            {tools.map(tool => (
              <div key={tool.name}>
                <Link href={`/${tool.name}`}>{tool.title}</Link>
              </div>
            ))}
          </ToolMenu>

          <div>
            {user.me && (
              <div>
                <div>{user.me.name}</div>
                <button onClick={user.logout} type="button">
                  logout
                </button>
              </div>
            )}
          </div>
        </Navbar>

        <Main>
          <CurrentTool />
        </Main>
      </Root>
    </>
  )
}
