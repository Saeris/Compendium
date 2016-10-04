import {bindable, customElement, containerless, inject} from 'aurelia-framework';
import MtG from '../../../services/mtg';
import $ from "jquery";
import 'simplebar/dist/simplebar.css';
import 'simplebar/dist/simplebar.min.js';

@customElement('oracle')
@containerless
@inject(MtG)
export class oracleCustomElement {
  @bindable card;
  constructor(mtg) {
    this.mtg = mtg;
    this.sets = mtg.results.sets;
  }
  attached() {
    let buttons = $(this.tab_nav);
    buttons.on('click', e => {
      this.switchTab(e.target);
    });
    $(this.basic).simplebar();
    $(this.details).simplebar();
    $(this.rules).simplebar();
  }
  switchTab(el) {
    let buttons = $(this.tab_nav);
    let tabs = $(this.tabs);
    let target = $(el).val();
    buttons.find("button").removeClass("selected");
    tabs.find(".tab").removeClass("active");
    $(el).addClass("selected");
    $(this[target]).addClass("active");
  }
  activate(card) {
    this.card = card;
  }
}
