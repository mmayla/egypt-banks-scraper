/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

const banksNames = require('./banks_names.json');

export default class CBE extends Bank {
  constructor() {
    const url = 'http://www.cbe.org.eg/en/EconomicResearch/Statistics/Pages/ExchangeRatesListing.aspx';
    super(banksNames.CBE, url);
  }

  static getCurrencyCode(name) {
    const dict = {
      'US Dollar​': 'USD',
      'Euro​': 'EUR',
      'Pound Sterling​': 'GBP',
      'Swiss Franc​': 'CHF',
      'Japanese Yen 100​': 'JPY',
      'Saudi Riyal​': 'SAR',
      'Kuwaiti Dinar​': 'KWD',
      'UAE Dirham​': 'AED',
      'Chinese yuan​': 'CNY',
    };

    return (dict[name]);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const tableRows = $('tbody').last().children();
    const rates = [];
    tableRows.each((index, row) => {
      const currencyName = $(row)
                            .children()
                              .eq(0)
                              .text()
                              .trim();
      const currencyBuy = $(row)
                            .children()
                              .eq(1)
                              .text()
                              .trim();
      const currencySell = $(row)
                            .children()
                              .eq(2)
                              .text()
                              .trim();

      rates.push({
        code: CBE.getCurrencyCode(currencyName),
        buy: currencyBuy,
        sell: currencySell,
      });
    });
    return rates;
  }
}
