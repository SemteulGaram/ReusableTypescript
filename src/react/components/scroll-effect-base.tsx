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

import { unsafeShortUuidV4 } from '../../utils/uuidUnsafe'

type Props = {
  offsetY?: number
  reverseOffsetY?: number
  cssBefore?: Interpolation|Interpolation[]
  cssAfter?: Interpolation|Interpolation[]
}
type State = {
  uidClass: string
}

class ScrollEffect extends React.Component<Props, State> {
  _bindedOnScroll: () => void

  constructor (props: Readonly<Props>) {
    super(props)

    this.state = {
      uidClass: 'scroll_effect--' + unsafeShortUuidV4()
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

    html.scrollTop
    const rect = element.getBoundingClientRect()
    const isTopExpose = rect.top
    console.log(isTopExpose)
  }

  componentDidMount (): void {
    try { window } catch (_) { return }
    window.addEventListener('scroll', this._bindedOnScroll)
  }

  componentWillUnmount (): void {
    try { window } catch (_) { return }
    window.removeEventListener('scroll', this._bindedOnScroll)
  }

  render (): React.ReactElement {
    return (<div className={ 'scroll_effect ' + this.state.uidClass }>
      { this.props.children }
    </div>)
  }
}

export default ScrollEffect
