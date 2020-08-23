import React, {useCallback} from 'react'
import {useLocation} from '../../../location'

export function Link(props: React.HTMLProps<HTMLAnchorElement>) {
  const {children, ...restProps} = props
  const loc = useLocation()

  const handleClick = useCallback((evt: React.MouseEvent<HTMLAnchorElement>) => {
    if (evt.shiftKey) return
    if (evt.ctrlKey) return
    if (evt.metaKey) return

    evt.preventDefault()

    const target = evt.currentTarget

    // @todo: query
    loc.pushState({path: target.pathname})
  }, [])

  return (
    <a {...restProps} onClick={handleClick}>
      {children}
    </a>
  )
}
