/* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

import request from 'request';

import Bank from './Bank';

import { banksNames } from './banks_names';

export default class CIB extends Bank {
  constructor() {
    const url = 'http://www.cibeg.com/_layouts/15/LINKDev.CIB.CurrenciesFunds/FundsCurrencies.aspx/GetCurrencies';
    super(banksNames.CIB, url);
  }

  /**
   * Request then pass json to scraper
   * @param {function} finish callback to pass rates to when finish scraping
   */
  scrape(finish) {
    request({
      url: this.url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JSON.parse('{ "lang": "en" }')),
    }, (error, response, body) => {
      const currencyList = JSON.parse(body).d;
      const rates = this.scraper(currencyList);

      finish(rates);
    });
  }

  /**
   * Scrape rates from html
   * @param {Object} currencyList list from the bank's raw json
   */
  scraper(currencyList) {
    const rates = [];
    currencyList.forEach((currency) => {
      rates.push({
        code: currency.CurrencyID,
        buy: currency.BuyRate,
        sell: currency.SellRate,
      });
    });
    return rates;
  }
}
