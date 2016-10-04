import {HttpClient} from 'aurelia-fetch-client';
import unionBy from "lodash/unionBy";
import values from "lodash/values";
import Card from '../models/card';
import Set from '../models/set';

export default class MtG {
  constructor() {
    this.BaseUrl = 'https://api.magicthegathering.io/v1';
    this.http = new HttpClient().configure(config => {
      config
        .withBaseUrl(this.BaseUrl)
        .withDefaults({
          headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
    });

    // Cache of fetch results
    // TODO: Set up history to prevent repeat requests to the API
    this.results = {
      history: {},
      cards: [],
      sets: {},
      types: [],
      supertypes: [],
      subtypes: []
    };

    // Run each of these once at startup to create a local cache
    let sets = this.getSets();
    sets.then(results => {
      this.results.sets = results;
    });

    let types = this.getTypes('types');
    types.then(results => {
      this.results.types = results;
    });

    let supertypes = this.getTypes('supertypes');
    supertypes.then(results => {
      this.results.supertypes = results;
    });

    let subtypes = this.getTypes('subtypes');
    subtypes.then(results => {
      this.results.subtypes = results;
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

  async getCards(config = {}) {
    let parameters = {
      name:         this.toList('name', config.name),
      layout:       this.toList('layout', config.layout),
      cmc:          this.toFieldWithMod ('cmc', config.cmc),
      colors:       this.toLogicalList('colors', config.colors),
      type:         this.toList('type', config.type),
      supertypes:   this.toLogicalList('supertypes', config.supertypes),
      types:        this.toLogicalList('types', config.types),
      subtypes:     this.toLogicalList('subtypes', config.subtypes),
      rarity:       this.toList('rarity', config.rarity),
      set:          this.toList('set', config.set),
      setName:      this.toList('setName', config.setName),
      text:         this.toList('text', config.text),
      flavor:       this.toList('flavor', config.flavor),
      artist:       this.toList('artist', config.artist),
      number:       this.toList('number', config.number),
      power:        this.toFieldWithMod ('power', config.power),
      toughness:    this.toFieldWithMod ('toughness', config.toughness),
      loyalty:      this.toFieldWithMod ('loyalty', config.loyalty),
      foreignNames: this.toField('foreignNames', config.foreignNames),
      language:     this.toField('language', config.language),
      gameFormat:   this.toField('gameFormat', config.gameFormat),
      legality:     this.toField('legality', config.legality),
      page:         this.toField('page', config.page),
      pageSize:     this.toField('pageSize', config.pageSize)
    };
    let query = values(parameters).filter(string =>{return string !== ''}).join('&');
    let request = `/cards?${encodeURI(query)}`;
    if (this.results.history.hasOwnProperty(request)) {
      console.log(`Returning cached request: ${request}`);
      return unionBy(this.results.cards, this.results.history[request], 'multiverseid');  
    }
    let data = await this.http.fetch(request).then(response => this.parseResponse(response));
    let results = [];
    let response = await data.body.then(result => {
      return result.cards
    });
    response.forEach(card => {
      results.push(new Card(card));
    });
    // TODO: Refactor code to return header information for request/response history
    this.results.history[request] = response;
    this.results.cards = unionBy(this.results.cards, results, 'multiverseid');
    return this.results.cards;
  }

  // TODO: Create tests for this method
  async getCard(id) {
    let data = await this.http.fetch(`/cards/${id}`).then(response => this.parseResponse(response));
    let card = await data.body.then(result => {
      return result.cards;
    });
    return new Card(card);
  }

  // TODO: Create tests for this method
  async getBooster(set) {
    let data = await this.http.fetch(`/sets/${set}/booster`).then(response => this.parseResponse(response));
    let results = [];
    let response = await data.body.then(result => {
      return result.cards
    });
    response.forEach(card => {
      results.push(new Card(card));
    });
    return results;
  }

  // TODO: Add handler to ensure all sets are being retrieved (ie: total-count > page-size)
  async getSets(config = {}) {
    let parameters = {
      name:   this.toSetList('name', config.name),
      block:  this.toList('block', config.block)
    };
    let query = values(parameters).filter(string =>{return string !== ''}).join('&');
    let data = await this.http.fetch(`/sets?${encodeURI(query)}`).then(response => this.parseResponse(response));
    let results = [];
    let response = await data.body.then(result => {
      return result.sets
    });
    response.forEach(set => {
      results.push(new Set(set));
    });
    let sets = {};
    results.forEach(set => {
      sets[set.code] = set;
    });
    this.results.sets = sets;
    return sets;
  }

  // TODO: Create tests for this method
  async getSet(id) {
    let data = await this.http.fetch(`/sets/${id}`).then(response => this.parseResponse(response));
    let set = await data.body.then(result => {
      return result.sets;
    });
    return new Set(set);
  }

  async getTypes(config = 'types') {
    let data = await this.http.fetch(`/${config}`).then(response => this.parseResponse(response));
    let types = await data.body.then(result => {
      return result[config];
    });
    return types;
  }

  parseResponse(response) {
    let config = {
      headers: {},
      body: response.json()
    }
    for (let pair of response.headers.entries()) {
      config.headers[pair[0]] = pair[1];
    }
    return new Response(config);
  }

  addModifiers(parameter, data) {
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

  toField(parameter, data) {
    return ((data !== '') && (typeof data !== 'undefined')) ? `${parameter}=${data}` : '' || '';
  }

  toFieldWithMod (parameter, data) {
    return ((data !== '') && (typeof data !== 'undefined')) ? this.addModifiers(parameter, data) : '';
  }

  toList(parameter, data) {
    if (Array.isArray(data)) {
      return `${parameter}=${data.join()}`;
    } else if ((data !== '') && (typeof data !== 'undefined')) {
      return `${parameter}=${data}`;
    } else {
      return '';
    }
  }

  toSetList(parameter, data) {
    if (Array.isArray(data)) {
      return `${parameter}=${data.join('|')}`;
    } else if ((data !== '') && (typeof data !== 'undefined')) {
      return `${parameter}=${data}`;
    } else {
      return '';
    }
  }

  toLogicalList(parameter, data) {
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
}

/* Helper Classes */

class Response {
  constructor(config) {
    this.body = config.body;
    this.count = parseInt(config.headers.count, 10);
    this.size = parseInt(config.headers['page-size'], 10);
    this.limit = parseInt(config.headers['ratelimit-limit'], 10);
    this.remaining = parseInt(config.headers['ratelimit-remaining'], 10);
    this.total = parseInt(config.headers['total-count'], 10);
  }
}
