import {customElement, containerless, bindable} from 'aurelia-framework';

@customElement('filter-taglist')
@containerless
export class FilterTaglist {
  @bindable config;
  constructor() {
  }
  attached() {
  }
}
