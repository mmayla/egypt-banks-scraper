/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

const banksNames = require('./banks_names.json');

export default class FIBE extends Bank {
  constructor() {
    const url = 'http://www.faisalbank.com.eg/FIB/arabic/rate.html';
    super(banksNames.FIBE, url);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const tableRows = $('.Action-Table tbody').children();
    const rates = [];
    tableRows.each((index, row) => {
      if ((index === 0) || (index === 1)) return;
      const currencyName = $(row)
                            .children()
                            .eq(1)
                            .text()
                            .trim();
      const buyRate = $(row)
                        .children()
                        .eq(2)
                        .text();
      const sellRate = $(row)
                        .children()
                        .eq(3)
                        .text()
                        .trim();
      rates.push({
        code: currencyName,
        buy: Number(buyRate),
        sell: Number(sellRate),
      });
    });
    return rates;
  }
}
