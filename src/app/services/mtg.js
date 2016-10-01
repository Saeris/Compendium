import {HttpClient} from 'aurelia-fetch-client';
import unionBy from "lodash/unionBy";
import values from "lodash/values";
import Card from '../models/card';
import Set from '../models/set';

export default class MtG {
  constructor(){
    this.cards - [];
    this.http = new HttpClient().configure(config => {
      config
        .withBaseUrl('https://api.magicthegathering.io/v1')
        .withDefaults({
          headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
    });
  }
  /* TODO: Implement error handling for all requests.
   *
   * MtG Developers API Docs:
   * http://docs.magicthegathering.io/?shell#overview
   *
   * Parameter  |  Accepts List  |  Description
   * ---------------------------------------------------------------------------
   * name	         true	            The card name. For split, double-faced and flip
   *                                cards, just the name of one side of the card.
   *                                Basically each ‘sub-card’ has its own record.
   *
   * layout	       true	            The card layout. Possible values: normal, split,
   *                                flip, double-faced, token, plane, scheme, phenomenon,
   *                                leveler, vanguard
   *
   * cmc	         false	          Converted mana cost. Always a number.
   *
   * colors	       true {and/or}	  The card colors. Usually this is derived from
   *                                the casting cost, but some cards are special
   *                                (like the back of dual sided cards and Ghostfire).
   *
   * type	         true	            The card type. This is the type you would see
   *                                on the card if printed today. Note: The dash
   *                                is a UTF8 'long dash’ as per the MTG rules
   *
   * supertypes	   true {and/or}	  The supertypes of the card. These appear to
   *                                the far left of the card type. Example values:
   *                                Basic, Legendary, Snow, World, Ongoing
   *
   * types	       true {and/or}	  The types of the card. These appear to the left
   *                                of the dash in a card type. Example values:
   *                                Instant, Sorcery, Artifact, Creature, Enchantment,
   *                                Land, Planeswalker
   *
   * subtypes	     true {and/or}	  The subtypes of the card. These appear to the
   *                                right of the dash in a card type. Usually each
   *                                word is its own subtype. Example values: Trap,
   *                                Arcane, Equipment, Aura, Human, Rat, Squirrel, etc.
   *
   * rarity	       true	            The rarity of the card. Examples: Common, Uncommon,
   *                                Rare, Mythic Rare, Special, Basic Land
   *
   * set	         true	            The set the card belongs to (set code).
   *
   * setName	     true	            The set the card belongs to.
   *
   * text	         true             The oracle text of the card. May contain mana
   *                                symbols and other symbols.
   *
   * flavor	       true	            The flavor text of the card.
   *
   * artist	       true	            The artist of the card. This may not match what
   *                                is on the card as MTGJSON corrects many card misprints.
   *
   * number	       true	            The card number. This is printed at the bottom-center
   *                                of the card in small text. This is a string, not
   *                                an integer, because some cards have letters in
   *                                their numbers.
   *
   * power	       false	          The power of the card. This is only present
   *                                for creatures. This is a string, not an integer,
   *                                because some cards have powers like: “1+*”
   *
   * toughness	   false	          The toughness of the card. This is only present
   *                                for creatures. This is a string, not an integer,
   *                                because some cards have toughness like: “1+*”
   *
   * loyalty	     false	          The loyalty of the card. This is only present
   *                                for planeswalkers.
   *
   * foreignName	 false	          The name of a card in a foreign language it was
   *                                printed in
   *
   * language	     false	          The language the card is printed in. Use this
   *                                parameter when searching by foreignName
   *
   * gameFormat	   false	          The game format, such as Commander, Standard,
   *                                Legacy, etc. (when used, legality defaults to
   *                                Legal unless supplied)
   *
   * legality	     false	          The legality of the card for a given format,
   *                                such as Legal, Banned or Restricted.
   *
   * page	         false	          The page of data to request
   *
   * pageSize	     false	          The amount of data to return in a single request.
   *                                The default is 100, the max is 1000. If more
   *                                than 1000 is requested, 100 will be returned.
   */

  async getCards(config){
    function addModifiers(parameter, data) {
      if ((typeof data === "object") && (data !== null)) {
        if (data.modifier !== '') {
          return `${parameter}=${data.modifier}${data.value}`;
        } else {
          return `${parameter}=${data.value}`;
        }
      } else {
        return `${parameter}=${data}`;
      }
    }

    function toField(parameter, data) {
      return ((data !== '') && (typeof data !== 'undefined')) ? `${parameter}=${data}` : '' || '';
    }

    function toFieldWithMod (parameter, data) {
      return ((data !== '') && (typeof data !== 'undefined')) ? addModifiers(parameter, data) : '';
    }

    function toList(parameter, data) {
      if (Array.isArray(data)) {
        return `${parameter}=${data.join()}`;
      } else if ((data !== '') && (typeof data !== 'undefined')) {
        return `${parameter}=${data}`;
      } else {
        return '';
      }
    }

    function toLogicalList(parameter, data) {
      if ((typeof data === "object") && (data !== null)) {
        if (Array.isArray(data.value)) {
          let logic = data.logic ? ',' : '|';
          return `${parameter}=${data.value.join(logic)}`;
        } else {
          return `${parameter}=${data.value}`;
        }
      } else {
        return '';
      }
    }

    let parameters = {
      name:         toList('name', config.name),
      layout:       toList('layout', config.layout),
      cmc:          toFieldWithMod ('cmc', config.cmc),
      colors:       toLogicalList('colors', config.colors),
      type:         toList('type', config.type),
      supertypes:   toLogicalList('supertypes', config.supertypes),
      types:        toLogicalList('types', config.types),
      subtypes:     toLogicalList('subtypes', config.subtypes),
      rarity:       toList('rarity', config.rarity),
      set:          toList('set', config.set),
      setName:      toList('setName', config.setName),
      text:         toList('text', config.text),
      flavor:       toList('flavor', config.flavor),
      artist:       toList('artist', config.artist),
      number:       toList('number', config.number),
      power:        toFieldWithMod ('power', config.power),
      toughness:    toFieldWithMod ('toughness', config.toughness),
      loyalty:      toFieldWithMod ('loyalty', config.loyalty),
      foreignNames: toField('foreignNames', config.foreignNames),
      language:     toField('language', config.language),
      gameFormat:   toField('gameFormat', config.gameFormat),
      legality:     toField('legality', config.legality),
      page:         toField('page', config.page),
      pageSize:     toField('pageSize', config.pageSize)
    };
    let query = values(parameters).filter(string =>{return string !== ''}).join('&');
    let data = await this.http.fetch(`/cards?${encodeURI(query)}`).then(response => {
      let data = {
        headers: response.headers.entries(),
        body: response.json()
      };
      return data;
    });
    let results = [];
    let cards = await data.body.then(result => {
      return result.cards
    });
    cards.forEach(card => {
      results.push(new Card(card));
    });
    return this.cards = unionBy(this.cards, results, 'multiverseid');
  }

  async getCard(id){
    let data = await this.http.fetch(`/cards/${id}`).then(response => response.json());
    return new Card(data.card);
  }

  async getSets(sets, config){
    function toList(parameter, data) {
      if (Array.isArray(data)) {
        return `${parameter}=${data.join('|')}`;
      } else if ((data !== '') && (typeof data !== 'undefined')) {
        return `${parameter}=${data}`;
      } else {
        return '';
      }
    }

    let parameters = {
      name:   toList('name', config.name),
      block:  toList('block', config.block)
    };
    let query = values(parameters).filter(string =>{return string !== ''}).join('&');
    let data = await this.http.fetch(`/sets?${encodeURI(query)}`).then(response => response.json());
    let results = [];
    data.sets.forEach(set => {
      results.push(new Set(set));
    });
    return unionBy(sets, results, 'code');
  }

  async getBooster(set){
    let data = await this.http.fetch(`/sets/${set}/booster`).then(response => response.json());
    let results = [];
    data.cards.forEach(card => {
      results.push(new Card(card));
    });
    return results;
  }

  async getSet(id){
    let data = await this.http.fetch(`/sets/${id}`).then(response => response.json());
    return new Set(data.set);
  }

  async getTypes(){
    let data = await this.http.fetch(`/types`).then(response => response.json());
    return data.types;
  }

  async getSuperTypes(){
    let data = await this.http.fetch(`/supertypes`).then(response => response.json());
    return data.supertypes;
  }

  async getSubTypes(){
    let data = await this.http.fetch(`/subtypes`).then(response => response.json());
    return data.subtypes;
  }
}
