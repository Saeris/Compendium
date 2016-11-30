import {bindable, child, customElement, containerless, inject} from 'aurelia-framework';
import MtG from '../../../services/mtg';
import './card-search.scss';

@customElement('card-search')
@containerless
@inject(MtG)
@child({name: 'CMC', selector: '#CMC'})
export class CardSearch {
  // Bound input values
  // Basic Text
  filterText      = '';
  textToggle      = false;
  // Basic Colors
  white           = true;
  blue            = true;
  black           = true;
  red             = true;
  green           = true;
  colorless       = true;
  generic         = true;
  // Basic Types
  artifact        = true;
  creature        = true;
  enchantment     = true;
  planeswalker    = true;
  instant         = true;
  sorcery         = true;
  land            = true;
  // Basic CMC
  zeroOne         = false;
  twoThree        = false;
  fourFive        = false;
  sixPlus         = false;
  // Basic rarities
  common          = true;
  uncommon        = true;
  rare            = true;
  mythic          = true;

  // Advanced
  advanced        = true;

  config          ={
    names: {
      name: 'Names',
      items: [],
      logic: true,
      excluded: true
    },
    categories: {
      name: 'Categories',
      items: [],
      logic: true,
      excluded: true
    },
    layouts: {
      name: 'Layouts',
      items: [],
      logic: true,
      excluded: true
    },
    multicolored: {
      name: 'Multicolored',
      items: [],
      logic: false,
      excluded: false
    },
    colors: {
      name: 'Colors',
      items: [
        {id: 'white', name: 'White', style: 'ms ms-cost ms-fw ms-w'},
        {id: 'blue', name: 'Blue', style: 'ms ms-cost ms-fw ms-u'},
        {id: 'black', name: 'Black', style: 'ms ms-cost ms-fw ms-b'},
        {id: 'red', name: 'Red', style: 'ms ms-cost ms-fw ms-r'},
        {id: 'green', name: 'Green', style: 'ms ms-cost ms-fw ms-g'},
        {id: 'colorless', name: 'Colorless', style: 'ms ms-cost ms-fw ms-c'},
        {id: 'generic', name: 'Generic', style: 'ms ms-cost ms-fw ms-x'}
      ],
      setting: true
    },
    cost: {
      name: 'Converted Mana Cost',
      steps: [
        {title: '0 to 1', content: '<i class="ms ms-0 ms-cost ms-fw"></i><em>-</em><i class="ms ms-1 ms-cost ms-fw"></i>'},
        {title: '2 to 3', content: '<i class="ms ms-2 ms-cost ms-fw"></i><em>-</em><i class="ms ms-3 ms-cost ms-fw"></i>'},
        {title: '4 to 5', content: '<i class="ms ms-4 ms-cost ms-fw"></i><em>-</em><i class="ms ms-5 ms-cost ms-fw"></i>'},
        {title: '6 or More', content: '<i class="ms ms-6 ms-cost ms-fw"></i><em>-</em><i class="ms ms-x ms-cost ms-fw"></i>'}
      ],
      selected: false
    },
    supertypes: {
      name: 'Supertypes',
      items: [],
      logic: true,
      excluded: true
    },
    basictypes: {
      name: 'Types',
      items: [
        {id: 'artifact', name: 'Artifact', style: 'ms ms-fw ms-artifact'},
        {id: 'creature', name: 'Creature', style: 'ms ms-fw ms-creature'},
        {id: 'enchantment', name: 'Enchantment', style: 'ms ms-fw ms-enchantment'},
        {id: 'planeswalker', name: 'Planeswalker', style: 'ms ms-fw ms-planeswalker'},
        {id: 'instant', name: 'Instant', style: 'ms ms-fw ms-instant'},
        {id: 'sorcery', name: 'Sorcery', style: 'ms ms-fw ms-sorcery'},
        {id: 'land', name: 'Land', style: 'ms ms-fw ms-land'}
      ],
      setting: true
    },
    types: {
      name: 'Types',
      items: [],
      logic: true,
      excluded: true
    },
    subtypes: {
      name: 'Subtypes',
      items: [],
      logic: true,
      excluded: true
    },
    abilities: {
      name: 'Abilities',
      items: [],
      logic: true,
      excluded: true
    },
    keywords: {
      name: 'Keywords',
      items: [],
      logic: true,
      excluded: true
    },
    power: {
      name: 'Power',
      steps: [
        {title: '0 to 1', content: '<i class="ms ms-0 ms-fw"></i><em>-</em><i class="ms ms-1 ms-fw"></i>'},
        {title: '2 to 3', content: '<i class="ms ms-2 ms-fw"></i><em>-</em><i class="ms ms-3 ms-fw"></i>'},
        {title: '4 to 5', content: '<i class="ms ms-4 ms-fw"></i><em>-</em><i class="ms ms-5 ms-fw"></i>'},
        {title: '6 or More', content: '<i class="ms ms-6 ms-fw"></i><em>-</em><i class="ms ms-x ms-fw"></i>'}
      ],
      selected: false
    },
    toughness: {
      name: 'Toughness',
      steps: [
        {title: '0 to 1', content: '<i class="ms ms-0 ms-fw"></i><em>-</em><i class="ms ms-1 ms-fw"></i>'},
        {title: '2 to 3', content: '<i class="ms ms-2 ms-fw"></i><em>-</em><i class="ms ms-3 ms-fw"></i>'},
        {title: '4 to 5', content: '<i class="ms ms-4 ms-fw"></i><em>-</em><i class="ms ms-5 ms-fw"></i>'},
        {title: '6 or More', content: '<i class="ms ms-6 ms-fw"></i><em>-</em><i class="ms ms-x ms-fw"></i>'}
      ],
      selected: false
    },
    loyalty: {
      name: 'Loyalty',
      steps: [
        {title: '2 to 3', content: '<i class="ms ms-loyalty-start ms-loyalty-2"></i><em>-</em><i class="ms ms-loyalty-start ms-loyalty-3"></i>'},
        {title: '4 to 5', content: '<i class="ms ms-loyalty-start ms-loyalty-4"></i><em>-</em><i class="ms ms-loyalty-start ms-loyalty-5"></i>'},
        {title: '6 to 7', content: '<i class="ms ms-loyalty-start ms-loyalty-6"></i><em>-</em><i class="ms ms-loyalty-start ms-loyalty-7"></i>'}
      ],
      selected: false
    },
    formats: {
      name: 'Formats',
      options: [
        {name: "Only Legal", value: false}
      ],
      items: [],
      logic: true,
      excluded: true
    },
    simpleformats: {
      name: 'Formats',
      items: [],
      simple: true
    },
    blocks: {
      name: 'Blocks',
      items: [],
      logic: true,
      excluded: true
    },
    sets: {
      name: 'Sets',
      items: [],
      logic: true,
      excluded: true
    },
    simplesets: {
      name: 'Sets',
      items: [],
      simple: true
    },
    rarities: {
      name: 'Rarity',
      items: [
        {id: 'common', name: 'Common', style: 'ss ss-bcore ss-grad ss-common'},
        {id: 'uncommon', name: 'Uncommon', style: 'ss ss-bcore ss-grad ss-uncommon'},
        {id: 'rare', name: 'Rare', style: 'ss ss-bcore ss-grad ss-rare'},
        {id: 'mythic', name: 'Mythic', style: 'ss ss-bcore ss-grad ss-mythic'}
      ],
      setting: true
    },
    artists: {
      name: 'Artists',
      items: [],
      logic: false,
      excluded: false
    }
  };

  constructor(mtg) {
    this.mtg = mtg;
  }

  async attached() {
    let formats = await this.mtg.getFormats();
    console.log(formats);
    let supertypes = await this.mtg.getTypes('supertypes');
    console.log(supertypes);
    let types = await this.mtg.getTypes('types');
    console.log(types);
    let subtypes = await this.mtg.getTypes('subtypes');
    console.log(subtypes);
    this.config.formats.items = formats;
    this.config.supertypes.items = supertypes;
    this.config.types.items = types;
    this.config.subtypes.items = subtypes;
  }

  search() {

  }

  switchTab(e) {
    let buttons = $(this.nav);
    let button = $(e.target).closest('button');
    let tabs = $(this.advanced);
    let target = button.val();
    buttons.find('button').removeClass('active');
    tabs.find('.tab').removeClass('active');
    $(button).addClass('active');
    $(this[target]).addClass('active');
  }
}
