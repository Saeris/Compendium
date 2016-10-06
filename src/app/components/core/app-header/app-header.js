import {bindable, customElement, containerless} from 'aurelia-framework';

@customElement('app-header')
@containerless
export class AppHeader {
  @bindable router;
  constructor() {
  }
}
