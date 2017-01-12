import { expect } from 'chai';

import NBG from '../src/banks/NBG';
import CreditAgricole from '../src/banks/CreditAgricole';
import CBE from '../src/banks/CBE';

const { describe, it } = global;

const banks = [
  NBG,
  CreditAgricole,
  CBE,
];

describe('Banks', () => {
  banks.forEach((Bank) => {
    const bank = new Bank();
    describe(bank.name.acronym, () => {
      it('Should not equal null', () => {
        const result = new Promise((resolve) => {
          bank.scrape((rates) => {
            resolve(rates);
          });
        });

        expect(result).to.not.equal(null);
      });
    });
  });
});
