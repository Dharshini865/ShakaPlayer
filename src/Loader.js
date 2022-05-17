import { Lightning } from '@lightningjs/sdk'
export default class Loader extends Lightning.Component {
  static _template() {
    return {
      Loader: {
        /*  mount: 1,
        x: 900,
        y: 800,
        item: */ src:
          '../static/images/Pause1.png',
      },
    }
  }
  $mediaplayerStop() {
    this.tag('Loader').stop()
  }
}
