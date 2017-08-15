import './normal.scss'

@customElement(`normal`)
@containerless
export class Normal {
  @bindable card
  constructor() {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
  }

  activate(card) {
    this.card = card
  }
}
