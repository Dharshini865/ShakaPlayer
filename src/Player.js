import { Lightning, MediaPlayer } from '@lightningjs/sdk'
/**
 * @export
 * @class Player
 * @extends {Lightning.Component}
 * Renders Player Component
 */
export default class Player extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1950,
        h: 116,
        y: 950,
        rect: true,
        color: 0xff000000,
      },
      MediaPlayer: { type: MediaPlayer, zIndex: 9999 },
      PlayButton: {
        x: 650,
        y: 980,
        w: 50,
        h: 50,
        type: Tile,
        src: '../static/images/Play.jpg',
      },
      PrevButton: {
        x: 550,
        y: 980,
        w: 50,
        h: 50,
        type: Tile,
        src: '../static/images/Prev.jpg',
      },
      NextButton: {
        x: 750,
        y: 980,
        w: 50,
        h: 50,
        type: Tile,
        src: '../static/images/Next.png',
      },
    }
  }
  _init() {
    this._setState('PlayButton')
    this.index = 0
  }

  /**
   *@static
   *@returns
   *@memberof Player
   *Set Player states
   */
  static _states() {
    return [
      class PlayButton extends this {
        _getFocused() {
          return this.tag('PlayButton')
        }
        _handleEnter() {
          if (this.isPlaying()) {
            this.tag('PlayButton').patch({ src: '../static/images/Pause.png' })
            this.tag('MediaPlayer').doPause()
          } else {
            this.tag('PlayButton').patch({ src: '../static/images/Play.jpg' })
            this.tag('MediaPlayer').doPlay()
          }
        }
        /**
         * Function to check whether the MediaPlayer is playing or not
         */
        isPlaying() {
          return this.tag('MediaPlayer').isPlaying()
        }
      },
      class NextButton extends this {
        _getFocused() {
          return this.tag('NextButton')
        }
        _handleLeft() {
          this._setState('PlayButton')
        }
        _handleEnter() {
          this.fireAncestors('$playerEnter', this.index)
        }
      },
      class PrevButton extends this {
        _getFocused() {
          return this.tag('PrevButton')
        }
        _handleRight() {
          this._setState('PlayButton')
        }
        _handleEnter() {
          this.fireAncestors('$playerEnter', this.index)
        }
      },
    ]
  }

  _handleRight() {
    this.index += 1
    this._setState('NextButton')
  }

  _handleLeft() {
    this.index -= 1
    this._setState('PrevButton')
  }

  Sintel(url) {
    this.tag('MediaPlayer')
    this.tag('MediaPlayer').open(url)
  }
}

class Tile extends Lightning.Component {
  static _template() {
    return {
      w: 50,
      h: 50,
      rect: true,
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
      smooth: { color: 0xf0fff000 },
    })
  }

  /**
   * Focus out of Images
   */
  _unfocus() {
    this.patch({
      smooth: { color: 0xfff00000 },
    })
  }
}
