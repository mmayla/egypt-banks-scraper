import { expect } from 'chai';

import NBG from '../src/banks/NBG';
import CAE from '../src/banks/CAE';
import CBE from '../src/banks/CBE';
import NBE from '../src/banks/NBE';
import CIB from '../src/banks/CIB';

const { describe, it } = global;

const banks = [
  NBG,
  CAE,
  CBE,
  NBE,
  CIB,
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

      describe('Rates', () => {
        it('rates should not equal null', () => bankTestPromise.then((rates) => {
          expect(rates).to.not.equal(null);
        }));

        it('code property in rates should be a string of 3 letters', () => bankTestPromise.then((rates) => {
          rates.forEach((currencyRate) => {
            expect(currencyRate.code).to.be.a('string');
            expect(currencyRate).to.have.property('code').with.lengthOf(3);
            // TODO check that code from currency iso list
          });
        }));

        it('buy property in rates should be a positive number', () => bankTestPromise.then((rates) => {
          rates.forEach((currencyRate) => {
            expect(currencyRate.buy).to.be.a('number');
            expect(currencyRate.buy).to.be.above(0);
          });
        }));

        it('sell property in rates should be a positive number', () => bankTestPromise.then((rates) => {
          rates.forEach((currencyRate) => {
            expect(currencyRate.sell).to.be.a('number');
            expect(currencyRate.buy).to.be.above(0);
          });
        }));
      });
    });
  });
});
