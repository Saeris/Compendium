import MtG from '../../services/mtg'
import Utilities from '../../services/utilities'
import './test.scss'

@inject(MtG, Utilities)
export class Test {
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

  async attached() {
    this.cards = await this.mtg.getCards(this.config)
    this.log.info(`Search Results:`, this.mtg.results)
    this.utilities.getScrollbarWidth(this.utilitybox)
  }
}
