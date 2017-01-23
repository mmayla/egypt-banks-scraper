/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

const banksNames = require('./banks_names.json');

export default class ADIB extends Bank {
  constructor() {
    const url = 'https://www.adib.eg/Foreign-Currencies';
    super(banksNames.ADIB, url);
  }
  static getCurrencyCode(name) {
    const dict = {
      'US Dollars': 'USD',
      'British Pound': 'GBP',
      Euro: 'EUR',
      'Swiss Franc': 'CHF',
      'Japanese Yen': 'JPY',
      'Thai Baht': 'THB',
      'Australian Dollar': 'AUD',
      'Danish Krone': 'DKK',
      'Swidish Krone': 'SEK',
      'Norwegian Krone': 'NOK',
      'Canadian Dollar': 'CAD',
      'Kuwaiti Dinar': 'KWD',
      'Omani Rial': 'OMR',
      'Bahraini Dinar': 'BHD',
      'Saudi Rial': 'SAR',
      'Emirati Dirham': 'AED',
      'Qatari Rial': 'QAR',
    };
    return (dict[name]);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const tableRows = $('.tbl-analyst tbody').children();
    const rates = [];
    tableRows.each((index, row) => {
      if (index === 0) return;
      const currencyName = $(row)
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
      if (ADIB.getCurrencyCode(currencyName) === 'JPY') {
        buyRate *= 100;
        sellRate *= 100;
      }

      rates.push({
        code: ADIB.getCurrencyCode(currencyName),
        buy: Number(buyRate),
        sell: Number(sellRate),
      });
    });
    return rates;
  }
}
