import {customElement, containerless, inject} from 'aurelia-framework';

@customElement('flip-card')
@containerless
export class flipCardCustomElement {
  constructor(config = {}) {
    this.activated = config.activated || true;
  }

  flip(){
    this.flipCard.classList.toggle("flipped")
  }
}
