/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

const banksNames = require('./banks_names.json');

export default class ABB extends Bank {
  constructor() {
    const url = 'http://www.albaraka-bank.com.eg/banking-services/exchange-rates.aspx';
    super(banksNames.ABB, url);
  }

  /**
   * Convert currency name to its ISO code
   * @param {string} currency name to get its ISO code
   */
  static getCurrencyCode(name) {
    const dict = {
      USD: 'USD',
      GBP: 'GBP',
      EURO: 'EUR',
      CHF: 'CHF',
      '100 JPY': 'JPY',
      SAR: 'SAR',
      BHD: 'BHD',
    };

    return (dict[name]);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const table = $('#hr-border').children();

    const rates = [];
    table.each((index, row) => {
      if (index < 1) return;
      const currencyName = $(row)
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
        code: ABB.getCurrencyCode(currencyName),
        buy: +(Number(buyRate) / 100).toFixed(4),
        sell: +(Number(sellRate) / 100).toFixed(4),
      });
    });
    return rates;
  }
}
