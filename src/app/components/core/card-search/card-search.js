import {bindable, child, customElement, containerless, inject} from 'aurelia-framework';
import MtG from '../../../services/mtg';

@customElement('card-search')
@containerless
@inject(MtG)
@child({name: 'CMC', selector: '#CMC'})
export class CardSearch {
  // Bound input values
  // Basic Text
  filterText      = '';
  name            = false;
  text            = false;
  // Basic Colors
  white           = false;
  blue            = false;
  black           = false;
  red             = false;
  green           = false;
  colorless       = false;
  generic         = false
  // Basic Types
  artifact        = false;
  creature        = false;
  enchantment     = false;
  planeswalker    = false;
  instant         = false;
  sorcery         = false;
  land            = false;
  // Basic CMC
  zeroOne         = false;
  twoThree        = false;
  fourFive        = false;
  sixPlus         = false;

  config          = {
    cmc: {
      name: 'Converted Mana Cost',
      steps: [
        '<i class="ms ms-0 ms-cost"></i>-<i class="ms ms-1 ms-cost"></i>',
        '<i class="ms ms-2 ms-cost"></i>-<i class="ms ms-3 ms-cost"></i>',
        '<i class="ms ms-4 ms-cost"></i>-<i class="ms ms-5 ms-cost"></i>',
        '<i class="ms ms-6 ms-cost"></i>+'
      ],
      selected: true
    }
  }

  constructor(mtg) {
    this.mtg        = mtg;
    this.sets       = mtg.results.sets;
    this.types      = mtg.results.types;
    this.supertypes = mtg.results.supertypes;
    this.subtypes   = mtg.results.subtypes;
    this.formats    = mtg.results.formats;
  }

  search(){

  }
}
