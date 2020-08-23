export interface StudioLayoutPlugin {
  type: 'layout'
  component: React.ComponentType<{}>
}

export interface StudioToolPlugin {
  type: 'tool'
  component: React.ComponentType<{basePath: string; path: string}>
  name: string
  title: string
}

export type StudioPlugin = StudioLayoutPlugin | StudioToolPlugin
