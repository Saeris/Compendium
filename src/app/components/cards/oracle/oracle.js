import {bindable, customElement, containerless, inject} from 'aurelia-framework';
import MtG from '../../../services/mtg';

@customElement('oracle')
@containerless
@inject(MtG)
export class Oracle {
  @bindable card;
  constructor(mtg) {
    this.mtg = mtg;
    this.sets = mtg.results.sets;
  }

  activate(card) {
    this.card = card;
  }

  attached() {
    $(this.tab_nav).on('click', e => {
      this.switchTab(e.target);
    });
  }

  switchTab(el) {
    let buttons = $(this.tab_nav);
    let tabs = $(this.tabs);
    let target = $(el).val();
    buttons.find('button').removeClass('selected');
    tabs.find('.tab').removeClass('active');
    $(el).addClass('selected');
    $(this[target]).addClass('active');
  }
}
