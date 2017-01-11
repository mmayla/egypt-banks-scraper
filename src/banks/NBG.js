// const cheerio = require('cheerio');
import cheerio from 'cheerio';

import Bank from './Bank';
import { NBG_NAME } from './banks_names';

export default class NBG extends Bank {
  constructor() {
    const url = 'http://www.nbg.com.eg/en/exchange-rates';
    super(NBG_NAME, url);
  }

  static scraper(html) {
    const $ = cheerio.load(html);
    const table = $('#exchange').eq(1);
    const rows = table.find($('tr'));

    const rates = [];
    rows.each((index, row) => {
      if (index === 0) return;

      const currencyCode = $(row).children().eq(1).text();
      const buyRate = $(row).children().eq(2).text();
      const sellRate = $(row).children().eq(3).text();

      rates.push({
        code: currencyCode,
        buy: buyRate,
        sell: sellRate,
      });
    });
    return rates;
  }
}
