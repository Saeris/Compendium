import {customElement, containerless, bindable} from 'aurelia-framework';

@customElement('filter-slider')
@containerless
export class filterSliderCustomElement {
  @bindable config;
  constructor() {
  }
  attached() {
  }
}
