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
      const bankTestPromise = new Promise((resolve) => {
        bank.scrape((rates) => {
          resolve(rates);
        });
      });

      it('Should not equal null', () => bankTestPromise.then((result) => {
        expect(result).to.not.equal(null);
      }));
    });
  });
});
