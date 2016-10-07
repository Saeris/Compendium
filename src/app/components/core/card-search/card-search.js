import {bindable, customElement, containerless, inject} from 'aurelia-framework';
import MtG from '../../../services/mtg';

@customElement('card-search')
@containerless
@inject(MtG)
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
