import {customElement, containerless, bindable} from 'aurelia-framework';

@customElement('filter-taglist')
@containerless
export class filterTaglistCustomElement {
  @bindable config;
  constructor() {
  }
  attached() {
  }
}
