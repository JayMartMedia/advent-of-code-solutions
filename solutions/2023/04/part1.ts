/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../../utils/ts/src';
import input from './input';
setupUtils();

const cards = input.splitLines();

let sum = 0;
cards.forEach(card => {
    let cardValue = 0;

    // parse winning numbers and my numbers
    const [winningNumbersStr, myNumbersStr] = card.split(':')[1].split('|');
    const winningNumbers = new Set(winningNumbersStr.split(' ')
        .filter(s => s.length > 0)
        .map(s => Number(s)));
    const myNumbers = new Set(myNumbersStr.split(' ')
        .filter(s => s.length > 0)
        .map(s => Number(s)));
    
    // find matches
    myNumbers.forEach(myNumber => {
        if(winningNumbers.has(myNumber)){
            if(cardValue === 0){
                cardValue = 1;
            }else{
                cardValue *= 2;
            }
        }
    });

    // accumulate
    sum += cardValue;
});

console.log(sum);