import { Lightning } from '@lightningjs/sdk'
import Slider from './Slider'
import Player from './Player'
/**
 * @export
 * @class App
 * @extends {Lightning.Component}
 * Renders App Component
 */
export default class App extends Lightning.Component {
  /**
   *@static
   *@returns
   *@memberof App
   *Renders the template
   */
  static _template() {
    return {
      Slider: {
        type: Slider,
        alpha: 0,
      },
      Player: {
        type: Player,
        alpha: 0,
      },
    }
  }

  /**
   * Function to show the toast and clear the register event
   * @param {*} cecParams - Toaster parameter
   */
  $playerEnter(index) {
    this._setState('Player')
    switch (index) {
      case 0:
        this.tag('Player').Sintel(
          'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.480p.vp9.webm'
        )
        break
      case 1:
        this.tag('Player').Sintel(
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        )
        break
      case 2:
        this.tag('Player').Sintel(
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        )
        break
      case 3:
        this.tag('Player').Sintel(
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4'
        )
        break
    }
  }

  _setup() {
    this._setState('Slider')
  }

  /**
   *@static
   *@returns
   *@memberof App
   *Set App states
   */
  static _states() {
    return [
      class Slider extends this {
        $enter() {
          this.tag('Slider').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Slider').setSmooth('alpha', 0)
        }
        // change focus path to Slider
        _getFocused() {
          return this.tag('Slider')
        }
      },
      class Player extends this {
        $enter() {
          this.tag('Player').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Player').setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag('Player')
        }
      },
    ]
  }
}
