/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import cheerio from 'cheerio';

import Bank from './Bank';

const banksNames = require('./banks_names.json');

export default class BDC extends Bank {
  constructor() {
    const url = 'http://www.banqueducaire.com/English/MarketUpdates/Pages/CurrencyExchange.aspx';
    super(banksNames.BDC, url);
  }

  static getCurrencyCode(name) {
    const dict = {
      'US DOLLAR': 'USD',
      EURO: 'EUR',
      'SWISS FRANC': 'CHF',
      'SWEDISH KRONA': 'SEK',
      'SAUDI ARABIAN RIYAL': 'SAR',
      'QATAR RIAL': 'QAR',
      'OMANI RIAL': 'OMR',
      'NORWEGIAN KRONE': 'NOK',
      'KUWAITI DINAR': 'KWD',
      'JORDANIAN DINAR': 'JOD',
      'JAPANESE YEN': 'JPY',
      'DANISH KRONE': 'DKK',
      'CANADIAN DOLLAR': 'CAD',
      'BRITISH POUND': 'GBP',
      'BAHRAIN DINAR': 'BHD',
      'AUSTRALIAN DOLLAR': 'AUD',
      'ARAB EMIRATES DIRHAM': 'AED',
    };
    return (dict[name]);
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */
  scraper(html) {
    const $ = cheerio.load(html);
    const tableRows = $('.curTbl tr');
    const rates = [];
    tableRows.each((index, row) => {
      if (index < 2) return;

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
        code: BDC.getCurrencyCode(currencyName),
        buy: Number(buyRate),
        sell: Number(sellRate),
      });
    });
    return rates;
  }
}
