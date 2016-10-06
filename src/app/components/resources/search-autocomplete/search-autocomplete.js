import {bindable, customElement, containerless, inject} from 'aurelia-framework';
// import Rx from '@reactivex/rxjs';
import MtG from '../../../services/mtg';

@customElement('search-autocomplete')
@containerless
@inject(MtG)
export class SearchAutocomplete {

  constructor(mtg) {
    this.mtg = mtg;
  }

  search(){

  }
}
