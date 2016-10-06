import {bindable, customElement, containerless, inject} from 'aurelia-framework';

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
