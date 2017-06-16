import './app-footer.scss'

@customElement(`app-footer`)
@containerless
export class AppFooter {
  constructor() {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
    // TODO: It's 2016, stop being a lazy twat and code this right
    this.currentyear = 2016
  }
}
