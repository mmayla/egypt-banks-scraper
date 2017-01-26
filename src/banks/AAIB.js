/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

import { banksNames } from './banks_names';

export default class AAIB extends Bank {
  constructor() {
    const url = 'http://aaib.com/services/rates';
    super(banksNames.AAIB, url);
  }

  static getCurrencyCode(name) {
    const dict = {
      'EURO CURRENCY': 'EUR',
      'US DOLLAR': 'USD',
      'POUND STERLING': 'GBP',
      'SWISS FRANC': 'CHF',
      'SAUDI RIYAL': 'SAR',
      'KUWAITI DINAR': 'KWD',
      'U.A.E DIRHAM': 'AED',
    };
    return (dict[name]);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const tableRows = $('#rates-table tr');

    const rates = [];
    tableRows.each((index, row) => {
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
        code: AAIB.getCurrencyCode(currencyName),
        buy: Number(buyRate),
        sell: Number(sellRate),
      });
    });
    return rates;
  }
}
