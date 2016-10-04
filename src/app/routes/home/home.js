import {inject} from 'aurelia-framework';
import MtG from '../../services/mtg';

@inject(MtG)
export class Home {
  cards = [];
  sets = {};
  config = {
    set: ['ogw'],
    pageSize: 24,
    page: 1
  };

  constructor(mtg) {
    this.mtg = mtg;
  }

  async attached() {
    this.cards = await this.mtg.getCards(this.config);
    console.log(this.mtg.results);
  }
}
