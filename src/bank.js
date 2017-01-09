const request = require('request');

export default class Bank {
  constructor(bankName, bankURL) {
    this._name = bankName;
    this._url = bankURL;
  }

  get name() {
    return this._name;
  }
  /**
   * Request then pass html to scraper function for scraping
   * @param {function} scraper
   */
  _scrape(scraper, finish) {
    request(this._url, (error, response, html) => {
      /**
       * [rates description]
       * @type {Array} rates [
       *                      {
       *                        code: USD, //currency iso code
       *                        buy: 20.4,
       *                        sell: 18.25
       *                      },
       *                      {
       *                        code: EUR,
       *                        buy: 18,
       *                        sell: 16.5
       *                      }
       *                     ]
       */
      let rates = null;
      if (!error && response.statusCode === 200) {
        rates = scraper(html);
      }

      finish(rates);
    });
  }
}
