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

function getAllBanksNames() {
  const names = [];
  banksObjects.forEach((bank) => {
    names.push(bank.name.acronym);
  });
  return names;
}

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
  // If banks array empty get all banks names
  const filteredBanks = banks.length === 0 ? getAllBanksNames() : banks;

  const result = {};

  const banksPromises = [];
  try {
    filteredBanks.forEach((bankName) => {
      const bank = getBankWithName(bankName);
      if (bank === null) throw new Error('No bank with the name', bankName);

      const bankPromise = new Promise((resolve) => {
        bank.scrape((err, rates) => {
          if (err) {
            resolve({
              name: bank.name,
              rates: [],
            });
            return;
          }

          // If currencies array empty get all rates
          const filteredRates = currencies.length === 0 ?
                                rates : filterCurrencies(rates, currencies);
          resolve({
            name: bank.name,
            rates: filteredRates,
          });
        });
      });
      banksPromises.push(bankPromise);
    });
  } catch (e) {
    return cb(e);
  }
  Promise.all(banksPromises).then((values) => {
    values.forEach((value) => {
      result[value.name.acronym] = value;
    });
    return cb(null, result);
  });
  return undefined;
}

module.exports = {
  getExchangeRates,
};
