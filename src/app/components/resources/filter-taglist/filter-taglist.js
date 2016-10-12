import {customElement, containerless, bindable} from 'aurelia-framework';
import './filter-taglist.scss';

@customElement('filter-taglist')
@containerless
export class FilterTaglist {
  @bindable config;
  constructor() {
  }
  attached() {
  }
}
