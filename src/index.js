import NBG from './banks/NBG';
import CAE from './banks/CAE';
import CBE from './banks/CBE';
import NBE from './banks/NBE';
import CIB from './banks/CIB';
import AAIB from './banks/AAIB';
import BDC from './banks/BDC';
import BM from './banks/BM';
import SCB from './banks/SCB';
import ABB from './banks/ABB';
import ABK from './banks/ABK';
import SAIB from './banks/SAIB';
import MIDB from './banks/MIDB';
import UBE from './banks/UBE';
import EDBE from './banks/EDBE';
import AB from './banks/AB';
import EGB from './banks/EGB';
import ADIB from './banks/ADIB';
import FIBE from './banks/FIBE';
import BBE from './banks/BBE';

const util = require('util');

const banksObjects = [
  new NBG(),
  new CAE(),
  new CBE(),
  new NBE(),
  new CIB(),
  new AAIB(),
  new BDC(),
  new BM(),
  new SCB(),
  new ABB(),
  new ABK(),
  new SAIB(),
  new MIDB(),
  new UBE(),
  new EDBE(),
  new AB(),
  new EGB(),
  new ADIB(),
  new FIBE(),
  new BBE(),
];

function getBankWithName(bankName) {
  for (let i = 0; i < banksObjects.length; i += 1) {
    if (banksObjects[i].name.acronym === bankName) {
      return banksObjects[i];
    }
  }
  return null;
}

function getCurrencyRates(rates, currencyCode) {
  for (let i = 0; i < rates.length; i += 1) {
    const filteredRate = rates[i].code === currencyCode ? rates[i] : undefined;
    if (filteredRate !== undefined) return filteredRate;
  }
  return null;
}

function filterCurrencies(rates, currenciesCodes) {
  const filteredRates = [];
  currenciesCodes.forEach((code) => {
    const rate = getCurrencyRates(rates, code);
    if (rate === null) return;

    filteredRates.push(rate);
  });
  return filteredRates;
}

function getExchangeRates(banks, currencies, cb) {
  const result = {};
  banks.forEach((bankName, index) => {
    const bank = getBankWithName(bankName);
    if (bank === null) throw new Error('No bank with the name', bankName);

    bank.scrape((rates) => {
      const filteredRates = filterCurrencies(rates, currencies);
      result[bank.name.acronym] = {
        name: bank.name,
        rates: filteredRates,
      };

      if (index === 0) cb(result);
    });
  });
}

getExchangeRates(['NBG', 'CIB'], ['USD', 'EUR', 'JPY'], (rates) => {
  console.log(util.inspect(rates, false, null));
});
