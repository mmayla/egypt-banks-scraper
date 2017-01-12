/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

const banksNames = require('./banks_names.json');

export default class CreditAgricole extends Bank {
  constructor() {
    const url = 'https://www.ca-egypt.com/en/personal-banking/';
    super(banksNames.CA, url);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const table = $('#f_box');
    const rows = table.find($('option'));

    const rates = [];
    for (let i = 0; i < rows.length; i += 1) {
      const currencyCode = rows.eq(i).text();
      const buyRate = rows.eq(i).attr('data-buy');
      const sellRate = rows.eq(i).attr('data-sell');

      rates.push({
        code: currencyCode,
        buy: buyRate,
        sell: sellRate,
      });
    }
    return rates;
  }
}
