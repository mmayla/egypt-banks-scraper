/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

import { banksNames } from './banks_names';

export default class UBE extends Bank {
  constructor() {
    const url = 'http://www.theubeg.com/fxRate';
    super(banksNames.UBE, url);
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
    const tableRows = $('table tr');
    const rates = [];
    tableRows.each((index, row) => {
      if (index < 1) return;
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
