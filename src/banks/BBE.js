/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

import { banksNames } from './banks_names';

export default class BBE extends Bank {
  constructor() {
    const url = 'http://www.blombankegypt.com/BlomEgypt/Exchange-rates';
    super(banksNames.BBE, url);
  }
  static getCurrencyCode(name) {
    const dict = {
      'USD   02': 'USD',
      'GBP   03': 'GBP',
      'EURO   30': 'EUR',
      'CHF   05': 'CHF',
      '100JPY   09': 'JPY',
      'DKK   13': 'DKK',
      'SEK   11': 'SEK',
      'NOK   22': 'NOK',
      'CAD   15': 'CAD',
      'KWD   21': 'KWD',
      'BHD   23': 'BHD',
      'SAR   07': 'SAR',
      'AED   16': 'AED',
      'QAR   20': 'QAR',
    };
    return (dict[name]);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const tableRows = $('.tableHolder table tbody').eq(0).children();
    const rates = [];
    tableRows.each((index, row) => {
      if (index === 0 || index === 1) return;
      const currencyName = $(row)
                            .children()
                              .eq(0)
                              .text()
                              .trim();
      const buyRate = $(row)
                        .children()
                          .eq(4)
                          .text()
                          .trim();
      const sellRate = $(row)
                        .children()
                          .eq(5)
                          .text()
                          .trim();
      rates.push({
        code: BBE.getCurrencyCode(currencyName),
        buy: Number(buyRate),
        sell: Number(sellRate),
      });
    });
    return rates;
  }
}
