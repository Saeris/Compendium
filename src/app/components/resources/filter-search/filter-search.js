import MtG from '../../../services/mtg'
import uniqBy from "lodash/unionBy"
import Rx from 'rxjs'
import './filter-search.scss'

@customElement(`filter-search`)
@inject(MtG)
export class FilterSearch {
  @bindable config = {
    name: `Search`,
    placeholder: `Search...`,
    parameter: `name`,
    limit: 20
  }
  results = []

  constructor(mtg) {
    this.log = LogManager.getLogger(`Compendium/${this.constructor.name}`)
    this.mtg = mtg
  }

  attached() {
    Rx.Observable
    .fromEvent(this.input, `keyup`)
    .pluck(`target`)
    .filter(el => el.matches(`input`))
    .pluck(`value`)
    .filter(val => val.length > 2)
    .debounceTime(250)
    .distinctUntilChanged()
    .switchMap(value => {
      let query = {}
      query[this.config.parameter] = value
      return this.mtg.getCards(query)
    })
    .subscribe(results => this.results = uniqBy(results, `name`))
  }

  search() {
    this.log.debug(this.results)
  }

  reset() {
    $(this.input).val(``)
    this.results = []
  }
}
