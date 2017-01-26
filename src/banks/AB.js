/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

import { banksNames } from './banks_names';

export default class AB extends Bank {
  constructor() {
    const url = 'https://www.alexbank.com/En/Home/ExchangeRates';
    super(banksNames.AB, url);
  }

  /**
   * Convert currency name to its ISO code
   * @param {string} currency name to get its ISO code
   */
  static getCurrencyCode(name) {
    const dict = {
      'US Dollar': 'USD',
      'British Pound': 'GBP',
      'Swiss Franc': 'CHF',
      'Japanese Yen': 'JPY',
      'Canadian Dollar': 'CAD',
      'Saudi Rial': 'SAR',
      'Kuwaiti Dinar': 'KWD',
      'Jordanian Dinar': 'JOD',
      'Omani Rial': 'OMR',
      'Bahraini Dinar': 'BHD',
      'Qatari Rial': 'QAR',
      'UAE Dirham': 'AED',
      'Swidish Krone': 'SEK',
      'Norwegian Krone': 'NOK',
      'Danish Krone': 'DKK',
      'Australian Dollar': 'AUD',
      Euro: 'EUR',
    };

    return (dict[name]);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const tableRows = $('.exchangerate-table tr');
    const rates = [];
    tableRows.each((index, row) => {
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
        code: AB.getCurrencyCode(currencyName),
        buy: Number(buyRate),
        sell: Number(sellRate),
      });
    });
    return rates;
  }
}
