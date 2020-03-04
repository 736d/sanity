/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
/* eslint-disable react/no-array-index-key */
/* eslint-disable id-length */
import React from 'react'
import {diffWordsWithSpace} from 'diff'

const colors = {
  unchanged: '#ccc',
  added: 'green',
  removed: 'red'
}

function stringDiffComponent(from, to) {
  const computedStringDiff = diffWordsWithSpace(from, to)
  return (
    <span>
      {computedStringDiff.map((part, index) => {
        let color = colors.unchanged
        if (part.added) color = colors.added
        if (part.removed) color = colors.removed
        return (
          <span key={index} style={{backgroundColor: color}}>
            {part.value}
          </span>
        )
      })}
    </span>
  )
}

const visualizers = {
  string: {
    editText: {
      component: props => {
        const {operation, path, from, to} = props.item
        const field = path.join('.')
        return (
          <li>
            {field} [{operation}] {operation === 'editText' && stringDiffComponent(from, to)}
          </li>
        )
      },
      haltNestedRendering: false // this is the default, keeping it here for the moment as an exmaple
    }
  },

  // TODO: Generate for all types by default, not only internal ones, but custom schema types as well?
  number: {
    edit: {
      component: props => {
        const {operation, path, from, to} = props.item
        const field = path.join('.')
        return (
          <li>
            {field} [{operation}] {`${from} --> ${to}`}
          </li>
        )
      }
    },
    add: {
      component: props => {
        const {operation, path, to} = props.item
        const field = path.join('.')
        return (
          <li>
            {field} [{operation}] {`--> ${to}`}
          </li>
        )
      }
    }
  },

  block: {
    editText: {
      component: props => {
        const {operation, path, from, to} = props.item
        const field = path.slice(-1)
        return (
          <li>
            {field} [{operation}] {operation === 'editText' && stringDiffComponent(from, to)}
          </li>
        )
      }
    }
  }
}

export default visualizers
