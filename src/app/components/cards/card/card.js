import {bindable, customElement, containerless, inject} from 'aurelia-framework';
import './card.scss';

@customElement('card')
@containerless
export class Card {
  @bindable config;
  constructor() {
    this.config = {
      view: '',
      model: []
    };
  }
}
