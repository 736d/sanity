import {Studio} from '@sanity/base'
import React from 'react'
import ReactDOM from 'react-dom'
import {dataset, projectId, schema} from './config'
import {plugins} from './plugins'

ReactDOM.render(
  <Studio dataset={dataset} plugins={plugins} projectId={projectId} schema={schema} />,
  document.getElementById('root')
)
