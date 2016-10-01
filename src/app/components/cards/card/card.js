import {bindable, customElement, containerless, inject} from 'aurelia-framework';

@customElement('card')
@containerless
export class cardCustomElement {
  @bindable config;
  constructor() {
    this.config = {
      view: '',
      model: []
    };
  }
}
