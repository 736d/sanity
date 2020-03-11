import {Summarizers} from '../@types/visual-diff'

import customSummarizers from 'part:@sanity/visual-diff/summarizers?'
import customVisualizers from 'part:@sanity/visual-diff/visualizers?'
import defaultSummarizers from './defaultSummarizers'
import defaultVisualizers from './defaultVisualizers'

const resolver = (): DiffResolver => {
  const allSummarizers = {...defaultSummarizers, ...customSummarizers}
  const allVisualizers = {...defaultVisualizers, ...customVisualizers}

  return {
    summarizers: allSummarizers,
    visualizers: allVisualizers
  }
}

export default resolver

export interface DiffResolver {
  summarizers?: Summarizers
  visualizers?: any // TODO
}
