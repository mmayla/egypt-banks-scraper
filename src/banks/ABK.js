/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

const banksNames = require('./banks_names.json');

export default class ABK extends Bank {
  constructor() {
    const url = 'http://www.abkegypt.com/rates_abk.aspx';
    super(banksNames.ABK, url);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const tableRows = $('.BLUE_TEXT, .ORANGE_TEXT');

    const rates = [];
    tableRows.each((index, row) => {
      const currencyCode = $(row)
                            .children()
                              .eq(0)
                              .text()
                              .trim();
      let buyRate = $(row)
                        .children()
                          .eq(1)
                          .text()
                          .trim();
      let sellRate = $(row)
                        .children()
                          .eq(2)
                          .text()
                          .trim();

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
    });
    return rates;
  }
}
