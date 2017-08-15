import MtG from "../../services/mtg"
import Utilities from "../../services/utilities"
import "./home.scss"

@inject(MtG, Utilities)
export class Home {
  cards = []
  sets = {}
  config = {
    set: [`ogw`],
    pageSize: 24,
    page: 1
  }

  constructor(mtg, utilities) {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
    this.mtg = mtg
    this.utilities = utilities
  }

  async bind() {
    try {
      this.log.debug(`Fetching remote resources...`)
      this.cards = await this.mtg.getCards(this.config)
      this.log.debug(this.cards)
      this.log.debug(`Successfully retrieved remote resources.`)
    } catch (error) {
      this.log.error(`Failed to fetch remote resources.`, error)
    }
  }

  attached() {
    this.utilities.getScrollbarWidth(this.utilitybox)
  }
}
