/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

import { banksNames } from './banks_names';

export default class SAIB extends Bank {
  constructor() {
    const url = 'http://www.saib.com.eg/foreign-currencies/';
    super(banksNames.SAIB, url);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const tableRows = $('.cont table tbody tr');
    const rates = [];
    tableRows.each((index, row) => {
      if (index < 1 || index > 6) return;
      const currencyCode = $(row)
                            .children()
                              .eq(0)
                              .text()
                              .trim();
      const buyRate = $(row)
                        .children()
                          .eq(1)
                          .text()
                          .trim();
      const sellRate = $(row)
                        .children()
                          .eq(2)
                          .text()
                          .trim();

      rates.push({
        code: currencyCode,
        buy: +(Number(buyRate) / 100).toFixed(4),
        sell: +(Number(sellRate) / 100).toFixed(4),
      });
    });
    return rates;
  }
}
