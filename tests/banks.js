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

      it('Should not equal null', () => bankTestPromise.then((rates) => {
        expect(rates).to.not.equal(null);
      }));

      it('code property in rates should be string of 3 letters', () => bankTestPromise.then((rates) => {
        rates.forEach((currencyRate) => {
          expect(currencyRate.code).to.be.a('string');
          expect(currencyRate).to.have.property('code').with.lengthOf(3);
        });
      }));

      it('buy property in rates should be a number', () => bankTestPromise.then((rates) => {
        rates.forEach((currencyRate) => {
          expect(currencyRate.buy).to.be.a('number');
        });
      }));
    });
  });
});
