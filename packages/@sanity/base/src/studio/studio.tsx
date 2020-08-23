import React, {createElement} from 'react'
import {LocationProvider} from '../location'
import {SanityProvider} from '../sanity'
import {UserProvider} from '../user'
import {SchemaProvider, SanitySchema} from '../schema'
import {StudioContext} from './context'
import {StudioLayoutPlugin, StudioPlugin} from './types'

interface StudioProps {
  dataset: string
  plugins: StudioPlugin[]
  projectId: string
  schema: SanitySchema[]
}

export function Studio(props: StudioProps) {
  const {dataset, plugins, projectId, schema} = props
  const layoutPlugins = plugins.filter(plugin => plugin.type === 'layout') as StudioLayoutPlugin[]

  if (layoutPlugins.length === 0) {
    return <div>No layout plugins</div>
  }

  if (layoutPlugins.length > 1) {
    return <div>More than one layout plugins</div>
  }

  return (
    <LocationProvider>
      <SanityProvider dataset={dataset} projectId={projectId}>
        <StudioContext.Provider value={{plugins}}>
          <UserProvider>
            <SchemaProvider schema={schema}>
              {createElement(layoutPlugins[0].component, {})}
            </SchemaProvider>
          </UserProvider>
        </StudioContext.Provider>
      </SanityProvider>
    </LocationProvider>
  )
}
