import {bindable, customElement, containerless, inject} from 'aurelia-framework';
import Rx from '@reactivex/rxjs/dist/es6';
import MtG from '../../../services/mtg';

@customElement('search-autocomplete')
@containerless
@inject(MtG)
export class searchAutocompleteCustomElement {

  constructor(mtg) {
    this.mtg = mtg;
  }

  search(){

  }
}
