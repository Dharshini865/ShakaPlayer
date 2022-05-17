import { Lightning } from '@lightningjs/sdk'
/**
 * @export
 * @class Slider
 * @extends {Lightning.Component}
 * Renders Slider Component
 */
export default class Slider extends Lightning.Component {
  /**
   * @static
   * @returns
   * @memberof Slider
   * Renders the template
   */
  static _template() {
    return {
      Background: {
        w: 1940,
        h: 1600,
        src: '../static/images/lightblack.jpg',
      },
      Logo: {
        Background: {
          w: 1940,
          h: 85,
          src: '../static/images/black.jpg',
        },
      },
      Header: {
        rect: true,
        w: 1920,
        h: 50,
        color: 0x0000000,
        Title: {
          x: 360,
          y: 50,
          mount: 0.5,
          text: {
            text: 'DASH Assets (SHAKA)',
            fontFace: 'Roboto-Regular',
            fontSize: 65,
          },
        },
      },
      SubHeading: {
        mount: 0.5,
        x: 180,
        y: 170,
        text: {
          text: 'Featured(4)',
          fontFace: 'TimesNew Roman',
          fontSize: 50,
          color: 0x0000000,
        },
      },
      Slider: {
        w: 800,
        h: 250,
        x: 480,
        y: 390,
        mount: 0.5,
        Wrapper: {},
      },
    }
  }
  _init() {
    this.index = 0
    this.dataLength = 4
    const buttons = []
    for (let i = 0; i < this.dataLength; i++) {
      buttons.push({
        type: Tile,
        x: i * (300 + 40),
        item: { src: `../static/images/Image${i + 1}.png` },
      })
    }
    this.tag('Wrapper').children = buttons
  }
  /**
   * Function to show the current focus of the image
   */
  repositionWrapper() {
    const wrapper = this.tag('Wrapper')
    const sliderW = this.tag('Slider').w
    const currentWrapperX = wrapper.transition('x').targetvalue || wrapper.x
    const currentFocus = wrapper.children[this.index]
    const currentFocusX = currentFocus.x + currentWrapperX
    const currentFocusOuterWidth = currentFocus.x + currentFocus.w

    if (currentFocusX < 0) {
      wrapper.setSmooth('x', -currentFocus.x)
    } else if (currentFocusOuterWidth > sliderW) {
      wrapper.setSmooth('x', sliderW - currentFocusOuterWidth)
    }
  }
  _getFocused() {
    return this.tag('Slider.Wrapper').children[this.index]
  }

  _handleLeft() {
    /**
     * navigate to previous Image on pressing Left arrow key
     */
    if (this.index === 0) {
      this.index = this.dataLength - 1
    } else {
      this.index -= 1
    }
    this.repositionWrapper()
  }

  _handleRight() {
    /**
     * navigate to next Image on pressing Right arrow key
     */
    if (this.index === this.dataLength - 1) {
      this.index = 0
    } else {
      this.index += 1
    }
    this.repositionWrapper()
  }

  _handleEnter() {
    /**
     * Directs to corresponding URL on pressing enter on Focused Image
     */
    this.fireAncestors('$playerEnter', this.index)
  }
}

class Tile extends Lightning.Component {
  static _template() {
    return {
      w: 300,
      h: 320,
      rect: true,
      Image: {
        w: w => w,
        h: h => h,
      },
    }
  }

  set item(obj) {
    const { src } = obj
    this.patch({
      Image: { src },
    })
  }

  /**
   * Focus on Images
   */
  _focus() {
    this.patch({
      smooth: { color: 0x00000000, scale: 1.2 },
      shader: { type: Lightning.shaders.Outline, color: 0xf0fff000 },
    })
  }

  /**
   * Focus out of Images
   */
  _unfocus() {
    this.patch({
      smooth: { color: 0x00000000, scale: 1.0 },
      shader: { type: Lightning.shaders.Outline, color: 0x00000000 },
    })
  }
}
