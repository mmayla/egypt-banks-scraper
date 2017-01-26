/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

import { banksNames } from './banks_names';

export default class CAE extends Bank {
  constructor() {
    const url = 'https://www.ca-egypt.com/en/personal-banking/';
    super(banksNames.CAE, url);
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
      const currencyCode = rows.eq(i).text().trim();
      let buyRate = rows.eq(i).attr('data-buy').trim();
      let sellRate = rows.eq(i).attr('data-sell').trim();

      // Fix JPY rate to be for 100 notes
      if (currencyCode === 'JPY') {
        buyRate *= 100;
        sellRate *= 100;
      }

      rates.push({
        code: currencyCode,
        buy: Number(buyRate),
        sell: Number(sellRate),
      });
    }
    return rates;
  }
}
