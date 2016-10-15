import {inject} from 'aurelia-framework';
import MtG from '../../services/mtg';
import './test.scss';

@inject(MtG)
export class Test {
  slider = {
    name: 'Converted Mana Cost',
    steps: [
      {title: '0 to 1', content: '<i class="ms ms-0 ms-cost ms-fw"></i><em>-</em><i class="ms ms-1 ms-cost ms-fw"></i>'},
      {title: '2 to 3', content: '<i class="ms ms-2 ms-cost ms-fw"></i><em>-</em><i class="ms ms-3 ms-cost ms-fw"></i>'},
      {title: '4 to 5', content: '<i class="ms ms-4 ms-cost ms-fw"></i><em>-</em><i class="ms ms-5 ms-cost ms-fw"></i>'},
      {title: '6 or More', content: '<i class="ms ms-6 ms-cost ms-fw"></i><em>-</em><i class="ms ms-x ms-cost ms-fw"></i>'}
    ],
    selected: false
  };

  taglist = {
    name: 'Types',
    options: [
      {name: "Only Legal", value: false}
    ],
    items: [],
    logic: true,
    excluded: true
  };

  constructor(mtg) {
    this.mtg = mtg;
  }

  async attached() {
    let types = await this.mtg.getTypes('types');
    this.taglist.items = types;
  }
}
