// const cheerio = require('cheerio');

import Bank from './bank';
import { NBG_NAME } from './banks_names';

export default class NBG extends Bank {
  constructor() {
    const url = 'http://www.nbg.com.eg/en/exchange-rates';
    super(NBG_NAME, url);
  }
}
