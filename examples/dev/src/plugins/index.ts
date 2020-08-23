import {StudioPlugin} from '@sanity/base'
import defaultLayout from './plugin-layout-default'
import deskTool from './plugin-tool-desk'

export const plugins: StudioPlugin[] = [defaultLayout(), deskTool()]
