import {customElement, containerless, bindable} from 'aurelia-framework';

@customElement('filter-slider')
@containerless
export class FilterSlider {
  @bindable config;
  constructor() {
  }
  attached() {
  }
}
