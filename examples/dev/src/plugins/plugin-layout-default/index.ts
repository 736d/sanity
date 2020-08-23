import {StudioLayoutPlugin} from '@sanity/base'
import {DefaultLayout} from './defaultLayout'

export default function defaultLayout(): StudioLayoutPlugin {
  return {
    type: 'layout',
    component: DefaultLayout
  }
}
