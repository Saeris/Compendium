import {bindable, customElement, containerless, inject} from 'aurelia-framework';
import Rx from '@reactivex/rxjs/dist/es6';
import MtG from '../../../services/mtg';

@customElement('card-search')
@containerless
@inject(MtG)
export class cardSearchCustomElement {

  constructor(mtg) {
    this.mtg = mtg;
  }

  search(){

  }
}
