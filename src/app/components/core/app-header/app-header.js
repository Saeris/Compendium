import {bindable, customElement, containerless} from 'aurelia-framework';
import './app-header.scss';

@customElement('app-header')
@containerless
export class AppHeader {
  @bindable router;
  constructor() {
  }
}
