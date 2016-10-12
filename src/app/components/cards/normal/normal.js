import {bindable, customElement, containerless, inject} from 'aurelia-framework';
import './normal.scss';

@customElement('normal')
@containerless
export class Normal {
  @bindable card;
  constructor() {
  }
  activate(card) {
    this.card = card;
  }
}
