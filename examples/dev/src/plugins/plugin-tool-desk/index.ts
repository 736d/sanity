import {StudioToolPlugin} from '@sanity/base'
import {DeskTool} from './deskTool'

export default function deskTool(): StudioToolPlugin {
  return {
    type: 'tool',
    component: DeskTool,
    name: 'desk',
    title: 'Desk'
  }
}
