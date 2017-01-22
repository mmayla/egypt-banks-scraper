/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

const banksNames = require('./banks_names.json');

export default class EGB extends Bank {
  constructor() {
    const url = 'https://eg-bank.com/ExchangeRates/ExchangeRates';
    super(banksNames.EGB, url);
  }

  static getCurrencyCode(name) {
    const dict = {
      'EURO CURRENCY': 'EUR',
      'US DOLLAR': 'USD',
      'POUND STERLING': 'GBP',
      'JAPANESE YEN': 'JPY',
      'SWISS FRANC': 'CHF',
      'AUSTRALIAN DOLLAR': 'AUD',
      'CANADIAN DOLLAR': 'CAD',
      'DANISH KRONE': 'DKK',
      'SWEDISH KRONA': 'SEK',
      'NORWEGIAN KRONE': 'NOK',
      'SAUDI RIYAL': 'SAR',
      'U.A.E DIRHAM': 'AED',
      'QATAR RIAL': 'QAR',
      'KUWAITI DINAR': 'KWD',
      'JORDANIAN DINAR': 'JOD',
      'BAHRAIN DINAR': 'BHD',
      'OMANI RIAL': 'OMR',
    };
    return (dict[name]);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const tableRows = $('.col-xs-12').eq(1).children();
    const rates = [];
    tableRows.each((index, row) => {
      if ((index === 0) || (index % 2) !== 0) return;
      const currencyName = $(row)
                            .children()
                            .eq(0)
                            .text()
                            .trim();
      const buyRate = $(row)
                        .children()
                        .eq(1)
                        .text();
      const sellRate = $(row)
                        .children()
                        .eq(2)
                        .text();
      rates.push({
        code: currencyName,
        buy: Number(buyRate),
        sell: Number(sellRate),
      });
    });
    return rates;
  }
}
