import './flip-card.scss'

@customElement(`flip-card`)
@containerless
export class FlipCard {
  constructor(config = {}) {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
    this.activated = config.activated || true
  }

  flip() {
    this.flipCard.classList.toggle(`flipped`)
  }
}
