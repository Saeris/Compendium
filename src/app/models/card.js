export default class Card {
  constructor(data){
    Object.assign(this, data);
    this.manaSymbols = this.getManaSymbols();
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

  isSplitMana(mana) {
    let regx = /wu|ub|br|rg|gw|wb|ur|bg|rw|gu|2w|2u|2b|2r|2g/;
    return mana.match(regx);
  }
}
