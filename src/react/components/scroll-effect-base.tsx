/** @jsx jsx */
/**
 * @module react/components/scroll-effect-base
 * Base effector to apply style when element expose on screen
 *
 * @version 1.0
 * @since 2020-06-01
 * @dependency React
 * @dependency @emotion/core
 * @TODO WIP
 */
import { jsx, Interpolation } from '@emotion/core'
import React from 'react'

type Props = {
  offsetY?: number
  reverseOffsetY?: number
  cssBefore?: Interpolation|Interpolation[]
  cssAfter?: Interpolation|Interpolation[]
}
type State = {
  uidClass: string
  effectActive: boolean
}

class ScrollEffect extends React.Component<Props, State> {
  _bindedOnScroll: () => void

  static _uidCount = 0

  constructor (props: Readonly<Props>) {
    super(props)

    this.state = {
      uidClass: 'scroll_effect--' + ScrollEffect._uidCount++,
      effectActive: false,
    }
    this._bindedOnScroll = this.onScroll.bind(this)
  }

  // Browser only
  onScroll (): void {
    try { document && window } catch (_) { return } // Global variable safe test

    const html = document.querySelector('html')
    const element = document.querySelector('.' + this.state.uidClass)
    if (!html || !element) {
      console.error(`ScrollEffect> html or ${ this.state.uidClass } element not found!`)
      return
    }

    // offset
    //     +     (top+, bottom+)
    // ┌─0─┐top
    // │  -  │
    // │     │ (top-, bottom+) (active state)
    // │  +  │
    // └─0─┘bottom
    //     -     (top-, bottom-)
    const rect = element.getBoundingClientRect()
    const topOffset = rect.top + (this.props.offsetY || 0)
    const bottomOffset = rect.top + rect.height + (this.props.reverseOffsetY || 0)

    if (topOffset <= 0 && bottomOffset >= 0) {
      if (!this.state.effectActive) this.setState({
        effectActive: true
      })
    } else {
      if (this.state.effectActive) this.setState({
        effectActive: false
      })
    }
  }

  componentDidMount (): void {
    try { window } catch (_) { return }
    window.addEventListener('scroll', this._bindedOnScroll)
    this._bindedOnScroll() // Ensure
  }

  componentWillUnmount (): void {
    try { window } catch (_) { return }
    window.removeEventListener('scroll', this._bindedOnScroll)
  }

  render (): React.ReactElement {
    return (<div className={ 'scroll_effect ' + this.state.uidClass } css={
      this.state.effectActive
        ? [this.props.cssBefore, this.props.cssAfter]
        : this.props.cssBefore
    }>
      { this.props.children }
    </div>)
  }
}

export default ScrollEffect
