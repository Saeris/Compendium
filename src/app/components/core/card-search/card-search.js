import {bindable, customElement, containerless, inject} from 'aurelia-framework';
import MtG from '../../../services/mtg';

@customElement('card-search')
@containerless
@inject(MtG)
export class CardSearch {

  constructor(mtg) {
    this.mtg = mtg;
  }

  search(){

  }
}
