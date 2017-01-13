/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

const banksNames = require('./banks_names.json');

export default class NBG extends Bank {
  constructor() {
    const url = 'http://www.nbg.com.eg/en/exchange-rates';
    super(banksNames.NBG, url);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const table = $('#exchange').eq(1);
    const rows = table.find($('tr'));

    const rates = [];
    rows.each((index, row) => {
      if (index === 0) return;

      const currencyCode = $(row)
                              .children()
                                .eq(1)
                                .text()
                                .trim();
      const buyRate = $(row)
                        .children()
                          .eq(2)
                          .text()
                          .trim();
      const sellRate = $(row)
                        .children()
                          .eq(3)
                          .text()
                          .trim();

      rates.push({
        code: currencyCode,
        buy: Number(buyRate),
        sell: Number(sellRate),
      });
    });
    return rates;
  }
}
