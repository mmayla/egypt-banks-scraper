import NBG from './banks/NBG';

const myBank = new NBG();

myBank.scrape((rates) => {
  console.log(rates);
});
