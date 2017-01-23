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

function getExchangeRates(banks, currencies) {
  banksObjects.forEach((bank) => {
    bank.scrape((rates) => {
      console.log(bank.name.acronym,':', rates);
    });
  });
}

getExchangeRates();
