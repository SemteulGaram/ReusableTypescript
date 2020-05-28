/**
 * @module dom/HandleScroll
 * React Scroll event handler
 *
 * @version 1.1
 * @since 2020-05-28
 * @dependency React
 */
export class HandleScroll {
  _bindedCallbackScrollEvent: () => void
  _isMount: boolean
  _originMount: (() => void)|undefined
  _originUnmount: (() => void)|undefined
  component: React.Component<unknown, unknown>
  handlers: {
    [key in string]: {
      lastScrollTop: number|null,
      callback: (scrollTop: number, diff: number, element: Element) => void,
      immediate: boolean
    }
  }


  constructor (component: React.Component<unknown, unknown>) {
    this._bindedCallbackScrollEvent = this._callbackScrollEvent.bind(this)
    this.component = component
    this._originMount = this.component.componentDidMount
    this._originUnmount = this.component.componentWillUnmount
    this._isMount = false
    this.handlers = {}

    this.component.componentDidMount = (): void => {
      if (!this._isMount) {
        this._isMount = true
        window.addEventListener('scroll', this._bindedCallbackScrollEvent)
        this._bindedCallbackScrollEvent()
      }

      if (this._originMount) this._originMount.call(this.component)
    }

    this.component.componentWillUnmount = (): void => {
      if (this._isMount) {
        this._isMount = false
        window.removeEventListener('scroll', this._bindedCallbackScrollEvent)
      }

      if (this._originUnmount) this._originUnmount.call(this.component)
    }
  }

  get isMount (): boolean { return this._isMount }

  addScrollListener (singleSelector: string, callback: (scrollTop: number, diff: number, element: Element) => void, immediate?: boolean): void {
    this.handlers[singleSelector] = {
      lastScrollTop: null,
      callback,
      immediate: !!immediate
    }
    if (immediate && this._isMount) {
      this._runCallback(singleSelector)
    }
  }

  removeScrollListener (singleSelector: string): void {
    if (this.handlers[singleSelector]) {
      delete this.handlers[singleSelector]
    }
  }

  _callbackScrollEvent (): void {
    Object.keys(this.handlers).forEach(selector => {
      this._runCallback(selector)
    })
  }

  _runCallback (selector: string): void {
    try {
      if (!document) throw 1
    } catch (_) {
      console.warn('HandleScroll>_callbackScrollEvent> document object not found. skipped')
      return
    }

    const element = document.querySelector(selector)
    if (!element) {
      console.warn(`HandleScroll>_callbackScrollEvent> Element(${ selector }) not found.`)
      return
    }

    const rect = element.getBoundingClientRect()
    const newScrollTop = rect.top
    const lastScrollTop = this.handlers[selector].lastScrollTop

    // LastScrollTop
    if (lastScrollTop === null) {
      this.handlers[selector].callback(newScrollTop, 0, element)
    } else {
      this.handlers[selector].callback(newScrollTop, newScrollTop - lastScrollTop, element)
    }

    this.handlers[selector].lastScrollTop = newScrollTop
  }
}
