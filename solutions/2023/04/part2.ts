/**
 * Run with `npx ts-node-dev --respawn ./part2.ts`
 */
import setupUtils from '../../utils/ts/src';
import input from './input';
setupUtils();

const cardLines = input.splitLines();

const cards: Card[] = cardLines.map(card => {
    // parse card id
    const cardId = Number(card.split('Card ')[1].split(':')[0]);

    // parse winning numbers and my numbers
    const [winningNumbersStr, myNumbersStr] = card.split(':')[1].split('|');
    const winningNumbers = new Set(winningNumbersStr.split(' ')
        .filter(s => s.length > 0)
        .map(s => Number(s)));
    const myNumbers = new Set(myNumbersStr.split(' ')
        .filter(s => s.length > 0)
        .map(s => Number(s)));

    return {
        cardId,
        myNumbers,
        winningNumbers
    }
});

let cardsProcessed = 0;
cards.forEach(card => {
    cardsProcessed += processCard(card);
});

console.log(cardsProcessed);

function processCard(card: Card): number {
    // if already calculated, return
    if(card.result) return card.result;

    // else calculate and save
    let _cardsProcessed = 1;
    let matches = 0;
    card.myNumbers.forEach(myNumber => {
        if(card.winningNumbers.has(myNumber)){
            matches += 1;
        }
    });
    for(let i = 0; i < matches; i += 1){
        _cardsProcessed += processCard(cards[card.cardId + i])
    }
    card.result = _cardsProcessed;
    return _cardsProcessed;
}

interface Card {
    cardId: number;
    myNumbers: Set<number>;
    winningNumbers: Set<number>;
    // number of cards that come out (for memo)
    result?: number;
}