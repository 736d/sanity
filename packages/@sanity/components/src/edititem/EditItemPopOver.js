import PropTypes from 'prop-types'
import React from 'react'
import styles from 'part:@sanity/components/edititem/popover-style'
import Button from 'part:@sanity/components/buttons/default'
import CloseIcon from 'part:@sanity/base/close-icon'
import StickyPortal from 'part:@sanity/components/portal/sticky'
import tryFindScrollContainer from '../utilities/tryFindScrollContainer'
import Stacked from '../utilities/Stacked'
import CaptureOutsideClicks from '../utilities/CaptureOutsideClicks'
import Escapable from '../utilities/Escapable'

const PADDING = 10

export default class EditItemPopOver extends React.PureComponent {

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    actions: PropTypes.arrayOf(PropTypes.shape({
      kind: PropTypes.string,
      title: PropTypes.string,
      key: PropTypes.string,
      handleClick: PropTypes.func
    })),
    isOpen: PropTypes.bool,
    scrollContainer: PropTypes.object
  }

  static defaultProps = {
    title: undefined,
    scrollContainer: undefined,
    onClose() {},
    actions: [],
    isOpen: true
  }
  lastY = 0
  state = {
    arrowLeft: 0,
    popoverLeft: 0,
    scrollContainer: undefined,
    isResizing: false
  }

  componentDidMount() {
    const {
      scrollContainer
    } = this.props

    if (!this._rootElement) {
      // console.error('no root element')
    }

    if (scrollContainer) {
      this.setScrollContainerElement(scrollContainer)
    } else {
      this.setScrollContainerElement(tryFindScrollContainer(this._rootElement))
    }
  }

  componentWillUnmount() {
    if (this._contentElement) {
      this._contentElement.removeEventListener('wheel', this.handleWheel, {passive: true})
      this._contentElement.removeEventListener('touchmove', this.handleTouchMove, {passive: true})
      this._contentElement.removeEventListener('touchstart', this.handleTouchStart, {passive: true})
    }
  }

  setScrollContainerElement = element => {
    this.setState({
      scrollContainer: element
    })
  }

  handleWheel = event => {
    const scrollContainer = this.state.scrollContainer
    const scrollBottom = this._contentElement.scrollTop >= this._contentElement.scrollHeight - this._contentElement.clientHeight
    if (scrollContainer && (this._contentElement.scrollTop <= 0 || scrollBottom)) {
      const scrollTo = (event.wheelDelta * -1) + scrollContainer.scrollTop
      scrollContainer.scrollTop = scrollTo
    }
  }

  setArrowElement = element => {
    this._arrowElement = element
  }

  setContentElement = element => {
    if (element) {
      element.addEventListener('wheel', this.handleWheel, {passive: true})
      element.addEventListener('touchmove', this.handleTouchMove, {passive: true})
      element.addEventListener('touchstart', this.handleTouchStart, {passive: true})
    }
    this._contentElement = element
  }

  handleTouchStart = event => {
    this.lastY = event.targetTouches[0].clientY
  }

  handleTouchMove = event => {
    const scrollContainer = this.state.scrollContainer
    const currentY = event.touches[0].clientY
    const scrollBottom = this._contentElement.scrollTop >= this._contentElement.scrollHeight - this._contentElement.clientHeight
    if (scrollContainer && (this._contentElement.scrollTop <= 0 || scrollBottom)) {
      const delta = this.lastY - currentY
      const scrollTo = delta + scrollContainer.scrollTop
      scrollContainer.scrollTop = scrollTo
    }
    this.lastY = currentY
  }

  setPopoverInnerElement = element => {
    this._popOverInnerElement = element
  }

  setRootElement = element => {
    this._rootElement = element
  }

  handlePortalResize = dimensions => {
    if (!this._popOverInnerElement) {
      return
    }

    const {
      rootLeft,
      availableHeight,
      availableWidth,
      isScrolling
    } = dimensions

    const width = this._popOverInnerElement.offsetWidth

    let popoverLeft = rootLeft - (width / 2)

    if (availableWidth < (rootLeft + (width / 2))) {
      popoverLeft = availableWidth - width - PADDING
    }

    let maxHeight = 500
    if (!this.state.initialHeight) {
      this.setState({
        initialHeight: this._contentElement.offsetHeight
      })
    }

    if (availableHeight && this.state.scrollContainer) {
      maxHeight = availableHeight
    }

    this.setState({
      popoverLeft: popoverLeft,
      availableHeight: maxHeight,
      arrowLeft: rootLeft,
      isResizing: isScrolling
    })
  }

  render() {
    const {
      title,
      children,
      actions,
      onClose,
      isOpen,
    } = this.props

    const {
      popoverLeft,
      arrowLeft,
      initialHeight,
      availableHeight,
      scrollContainer,
      isResizing
    } = this.state

    return (
      <div style={{display: 'span'}} ref={this.setRootElement}>
        <StickyPortal
          isOpen={isOpen}
          scrollContainer={scrollContainer}
          onResize={this.handlePortalResize}
          stickToTop
        >
          <Stacked>
            {isActive => (
              <div
                ref={this.setPopoverInnerElement}
                className={styles.root}
              >
                <div
                  className={title ? styles.filledArrow : styles.arrow}
                  ref={this.setArrowElement}
                  style={{
                    left: `${arrowLeft}px`
                  }}
                />
                <div
                  className={styles.popover}
                  style={{
                    left: `${popoverLeft}px`
                  }}
                >
                  <button className={title ? styles.closeInverted : styles.close} type="button" onClick={onClose}>
                    <CloseIcon />
                  </button>

                  {
                    title && (
                      <h3 className={styles.title}>
                        {title}
                      </h3>
                    )
                  }
                  <Escapable onEscape={event => ((isActive || event.shiftKey) && onClose())} />
                  <CaptureOutsideClicks onClickOutside={isActive ? onClose : null}>
                    <div
                      ref={this.setContentElement}
                      className={isResizing ? styles.contentIsResizing : styles.content}
                      style={{
                        maxHeight: `${Math.min(initialHeight + 16, availableHeight)}px`
                      }}
                    >
                      {children}
                    </div>
                    {
                      actions.length > 0 && (
                        <div className={styles.functions}>
                          {
                            actions.map(action => {
                              return (
                                <Button
                                  key={action.key}
                                  onClick={action.handleClick}
                                  kind={action.kind}
                                  className={styles[`button_${action.kind}`] || styles.button}
                                >
                                  {action.title}
                                </Button>
                              )
                            })
                          }
                        </div>
                      )
                    }
                  </CaptureOutsideClicks>
                </div>
              </div>
            )}
          </Stacked>
        </StickyPortal>
      </div>
    )
  }
}
