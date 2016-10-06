import {customElement, containerless} from 'aurelia-framework';

@customElement('app-footer')
@containerless
export class AppFooter {
  constructor() {
    // TODO: It's 2016, stop being a lazy twat and code this right
    this.currentyear = 2016;
  }
}
