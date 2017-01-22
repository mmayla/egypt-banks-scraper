import ADIB from './banks/ADIB';

const myBank = new ADIB();

myBank.scrape((rates) => {
  console.log(rates);
});
