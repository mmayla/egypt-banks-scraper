/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

const banksNames = require('./banks_names.json');

export default class EDBE extends Bank {
  constructor() {
    const url = 'http://www.edbebank.com/EN/BankingServices/TreasuryFiles/exchangerates.xml';
    super(banksNames.EDBE, url);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(xml) {
    const $ = cheerio.load(xml, { xmlMode: true });
    const ratesTag = $('rates');

    const rates = [];
    // USD
    rates.push({
      code: 'USD',
      buy: Number(ratesTag.attr('USDBbuy')),
      sell: Number(ratesTag.attr('USDBsell')),
    });
    // EUR
    rates.push({
      code: 'EUR',
      buy: Number(ratesTag.attr('EURBbuy')),
      sell: Number(ratesTag.attr('EURBsell')),
    });
    // GBP
    rates.push({
      code: 'GBP',
      buy: Number(ratesTag.attr('GBPBbuy')),
      sell: Number(ratesTag.attr('GBPBsell')),
    });
    // CHF
    rates.push({
      code: 'CHF',
      buy: Number(ratesTag.attr('CHFBbuy')),
      sell: Number(ratesTag.attr('CHFBsell')),
    });
    // JPY
    rates.push({
      code: 'JPY',
      // Fix JPY rate to be for 100 notes
      buy: Number(ratesTag.attr('JPYBbuy')) * 100,
      sell: Number(ratesTag.attr('JPYBsell')) * 100,
    });
    return rates;
  }
}
