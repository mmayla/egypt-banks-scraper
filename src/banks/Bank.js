const request = require('request');

export default class Bank {
  /**
   * @param {Object} bankName names of the bank acronym, english,
   * arabic, etc
   * @param {String} url of the bank exchange rates web page
   */
  constructor(bankName, bankURL) {
    this.name = bankName;
    this.url = bankURL;
  }

  /**
   * Request then pass html to scraper function for scraping
   * @param {function} finish callback to pass rates to when finish scraping
   */
  scrape(finish) {
    request(this.url, (error, response, html) => {
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
        rates = this.scraper(html);
        finish(null, rates);
      } else {
        finish(new Error(`Error requisting ${this.name}`));
      }
    });
  }
}
