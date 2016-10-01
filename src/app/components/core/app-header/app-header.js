import {bindable, customElement, containerless} from 'aurelia-framework';

@customElement('app-header')
@containerless
export class appHeaderCustomElement {
  @bindable router;
  constructor() {
  }
}
