/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

const banksNames = require('./banks_names.json');

export default class SCB extends Bank {
  constructor() {
    const url = 'http://scbank.com.eg/CurrencyAll.aspx';
    super(banksNames.SCB, url);
  }

  /**
   * Convert currency name to its ISO code
   * @param {string} currency name to get its ISO code
   */
  static getCurrencyCode(name) {
    const dict = {
      'US Dollar': 'USD',
      'Sterling Pound': 'GBP',
      'Australian Dollar': 'AUD',
      EUR: 'EUR',
      'Canadian Dollar': 'CAD',
      'Danish Krone': 'DKK',
      'Norwegian Krone': 'NOK',
      'Swedish Krone': 'SEK',
      'Swiss Franc': 'CHF',
      YEN: 'JPY',
      'Saudi Rial': 'SAR',
      'Kuwaiti Dinar': 'KWD',
      'UAE Dirham': 'AED',
    };

    return (dict[name]);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const tableRows = $('#Table_01 tr:nth-child(4) > td:nth-child(2) > table tr');
    const rates = [];
    tableRows.each((index, row) => {
      if (index < 2) return;
      const currencyName = $(row)
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
        code: SCB.getCurrencyCode(currencyName),
        buy: Number(buyRate),
        sell: Number(sellRate),
      });
    });
    return rates;
  }
}
