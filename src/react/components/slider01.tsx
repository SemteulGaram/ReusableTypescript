/** @jsx jsx */
/**
 * @module react/components/slider01
 * Image slider style 01
 *
 * @version 1.0
 * @since 2020-06-01
 * @dependency React
 * @dependency @emotion/core
 * @TODO Make some property to expose api
 */
import { jsx, Interpolation } from '@emotion/core'
import React, { ReactElement } from 'react'

type Slider01Props = {
  sliderSpeed?: number
  imgSrcs: string[]
}

type Slider01State = {
  uidClass: string
  sliderSpeed: number
  imgElements: ReactElement[]
  currentIndex: number
  currentProgress: number
}

class Slider01 extends React.Component<Slider01Props, Slider01State> {
  _intervalUid: NodeJS.Timeout|null

  static _uidCount = 0

  constructor (props: Readonly<Slider01Props>) {
    super(props)

    if (this.props.imgSrcs.length < 3) {
      throw new Error('Too few images to create slider. There must be at least three.')
    }

    const uidClass = 'slider01--' + Slider01._uidCount++
    this.state = {
      uidClass,
      sliderSpeed: props.sliderSpeed || 0.02,
      imgElements:  props.imgSrcs.map((v: string, i: number) => {
        return this.createImgElement(uidClass + '--' + i, v, this.normalizeIndex(i + 1))
      }),
      currentIndex: 0,
      currentProgress: 0,
    }
    this._intervalUid = null
  }

  normalizeIndex (index: number) {
    const length = this.props.imgSrcs.length
    if (length <= 0) return index
    while (index < 0) index += length
    while (index >= length) index -= length
    return index
  }

  createImgElement (key: string, src: string, position: number = -1): ReactElement {
    const defaultCss: Interpolation = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 1,
      transform: 'none',

      backgroundImage: `url("${ src }")`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',

      transition: 'transform .5s, opacity .5s',
    }

    let positionCss: Interpolation
    switch(position) {
      default:
        positionCss = {
          transform: 'translateX(0)',
          opacity: 0,
        }
      break; case 0:
        positionCss = {
          transform: 'translateX(105%)',
          opacity: 0,
        }
      break; case 1:
        positionCss = {
          transform: 'translateX(0)',
          opacity: 1,
        }
      break; case 2:
        positionCss = {
          transform: 'translateX(-105%)',
          opacity: 0,
        }
      break;
    }
    return <div key={ key } className={ key } css={[ defaultCss, positionCss ]}></div>
  }

  componentDidMount (): void {
    if (!window || !document) return
    if (this._intervalUid === null) {
      this._intervalUid = setInterval(() => {
        if (this.state.currentProgress < 1) {
          let currentProgress = this.state.currentProgress + this.state.sliderSpeed
          if (currentProgress > 1) currentProgress = 1
          this.setState({
            currentProgress
          })
        } else {
          const currentIndex = this.normalizeIndex(this.state.currentIndex + 1)
          this.setState({
            currentProgress: 0,
            currentIndex,
            imgElements: this.props.imgSrcs.map((v: string, i: number) => {
              return this.createImgElement(this.state.uidClass + '--' + i, v, this.normalizeIndex(currentIndex + i))
            })
          })
        }
      }, 100)
    }
  }

  componentWillUnmount (): void {
    if (this._intervalUid) {
      clearInterval(this._intervalUid)
      this._intervalUid = null
    }
  }

  render (): React.ReactElement {
    return (<div className='slider01' css={{
      position: 'relative',
      width: '100%',
      height: '100%',

      display: 'flex',
      flexDirection: 'column',
    }}>
      <div className='slider01__imgs' css={{
        position: 'relative',

        flex: '1 0 auto',
      }}>
        { this.state.imgElements }
      </div>
      <div className='slider01__progress' css={{
        padding: '12px 0',
        flex: '0 0 auto', /* Do not grow */

        display: 'flex',
        flexDirection: 'row-reverse', /* row, row-reverse */
        alignItems: 'center',
      }}>
        <div className='slider01__progress__line' css={{
          position: 'relative',
          height: 4,

          flex: '1 0 auto',

          backgroundColor: '#DDDDDD',
        }}>
          <div className='slider01__progress__line__bar' css={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: (this.state.currentProgress*100).toFixed(2) + '%',
            height: '100%',

            backgroundColor: '#003269',

            transition: 'width linear .1s',
          }}></div>
        </div>
        <div className='slider01__progress__gep1' css={{ width: 16 }}></div>
        <div className='slider01__progress__content  __font_b' css={{
          flex: '0 0 auto', /* Do not grow */

          color: '#D8D8D8',
          fontSize: 18,
          lineHeight: 1,
          textAlign: 'center',
        }}>
          <span className='slider01__progress__content__index' css={{
            color: '#003269'
          }}>{ (this.state.currentIndex + 1).toString().padStart(2, '0') }</span>
          <span className='slider01__progress__content__seperator' css={{
            padding: '0 4px',
          }}>/</span>
          <span className='slider01__progress__content__total'>{ (this.props.imgSrcs.length).toString().padStart(2, '0') }</span>
        </div>
      </div>

    </div>)
  }
}

export default Slider01
