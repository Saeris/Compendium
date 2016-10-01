import {inject} from 'aurelia-framework';
import MtG from '../../services/mtg';

@inject(MtG)
export class Home {
  constructor(mtg) {
    this.mtg = mtg;
    this.cards = mtg.cards;
    this.config = {
      set: 'kld',
      pageSize: 10,
      page: 1
    };
  }

  async attached() {
    this.cards = await this.mtg.getCards(this.config);
  }
}
