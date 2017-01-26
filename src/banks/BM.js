/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

import { banksNames } from './banks_names';

export default class BM extends Bank {
  constructor() {
    const url = 'http://www.banquemisr.com/en/exchangerates';
    super(banksNames.BM, url);
  }

  /**
   * Convert currency name to its ISO code
   * @param {string} currency name to get its ISO code
   */
  static getCurrencyCode(name) {
    const dict = {
      'US DOLLAR': 'USD',
      EURO: 'EUR',
      'GB POUND': 'GBP',
      'SWISS FRANC': 'CHF',
      'DENMARK KRONE': 'DKK',
      'KUWAIT DINAR': 'KWD',
      'SAUDI RIYAL': 'SAR',
      'JORDANIAN DINAR': 'JOD',
      'BAHRAIN DINAR': 'BHD',
      'QATARI RIAL': 'QAR',
      'OMAN RIYAL': 'OMR',
      'UAE DIRHAM': 'AED',
      'SWEDISH KRONA': 'SEK',
      'NORWAY KRONE': 'NOK',
      'CANADA DOLLAR': 'CAD',
      'AUSTRALIA DOLLAR': 'AUD',
      'JAPAN YEN': 'JPY',
    };

    return (dict[name]);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const tableRows = $('.exchangeRates tbody tr');

    const rates = [];
    tableRows.each((index, row) => {
      if (index < 2 || index > 18) return;

      const currencyName = $(row).children().eq(0).text();
      const buyRate = $(row).children().eq(1).text();
      const sellRate = $(row).children().eq(2).text();

      rates.push({
        code: BM.getCurrencyCode(currencyName),
        buy: Number(buyRate),
        sell: Number(sellRate),
      });
    });
    return rates;
  }
}
