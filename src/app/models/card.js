export default class Card {
  constructor(data){
    Object.assign(this, data);
    this.manaSymbols = this.getManaSymbols();
    // Skip cards that don't have ability text
    if (this.text) {
      this.abilities = this.getAbilities(this.text);
    }
    // TODO: Create parseRulings function (refactor parts of getAbilities)
    // TODO: Create Extract Keywords function (Flying, Haste, etc)
    // TODO: Create toLoyalty function
  }

  getManaSymbols() {
    let regx = /{(.+?)}/ig;
    let extracted;
    let results = [];
    while ((extracted = regx.exec(this.manaCost)) !== null) {
      results.push(extracted[1].toLowerCase().replace('/', '').replace(',', ''));
    }
    return results;
  }

  isMana(symbol) {
    let regx = /w|u|b|r|g|c|p|s|x|y|z|\d|t|q|wu|ub|br|rg|gw|wb|ur|bg|rw|gu|2w|2u|2b|2r|2g|1-2|infinity/;
    return symbol.match(regx);
  }

  isSplitMana(symbol) {
    let regx = /wu|ub|br|rg|gw|wb|ur|bg|rw|gu|2w|2u|2b|2r|2g/;
    return symbol.match(regx);
  }

  toTap(symbol) {
    if(symbol == 't'){
      return 'tap';
    } else if (symbol == 'q'){
      return 'untap';
    } else {
      return symbol
    }
  }

  getAbilities(text) {
    // Parse text for italics
    let regx1 = /\((.+?)\)|.+?(?= \u2013| \u2014)/g;
    let extracted;
    let italics = {};
    while ((extracted = regx1.exec(text)) !== null) {
      italics[extracted[0]] = extracted[0];
    }

    // Wrap italics in markup
    for (let line in italics) {
      text = text.split(line).join(`<em>${italics[line]}</em>`);
    }

    // Parse text for symbols
    let regx2 = /{(.+?)}/ig;
    let symbols = {};
    while ((extracted = regx2.exec(text)) !== null) {
      let symbol = extracted[1].toLowerCase().replace('/', '').replace(',', '');
      let mana = this.isMana(symbol) ? ' ms-cost' : '';
      let split = this.isSplitMana(symbol) ? ' ms-split' : '';
      symbols[extracted[0]] = `<i class="ms ms-${this.toTap(symbol)}${mana}${split} ms-fw" title='${extracted[0]}'></i>`;
    }

    // Replace symbols with markup
    for (let symbol in symbols) {
      text = text.split(symbol).join(symbols[symbol]);
    }

    // Separate text into multiple lines to be processed individually
    let lines = text.split('\n');

    return lines;
  }
}
