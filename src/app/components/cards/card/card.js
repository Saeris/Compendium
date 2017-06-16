import './card.scss'

@customElement(`card`)
@containerless
export class Card {
  @bindable config
  constructor() {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
    this.config = {
      view: ``,
      model: []
    }
  }
}
