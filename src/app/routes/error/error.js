import './error.scss'

export class Error {
  constructor() {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
  }

  attached() {
  }
}
