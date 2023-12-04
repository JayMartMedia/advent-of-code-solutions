/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../../utils/ts/src';
import input from './input';
setupUtils();

const lines = input.splitLines();
const grid = lines.map(line => line.split(''));
const rowMaxIdx = grid.length - 1;
const charMaxIdx = grid[0].length - 1;

let sum: number = 0;
grid.forEach((row, rowIdx) => {
    let currentNumber: string = '';
    let isAdjacentFound: boolean = false;
    row.forEach((char, charIdx) => {
        // if char is number
        if(!Number.isNaN(Number(char))){
            // if char is beginning of number or continuation of number
            currentNumber += char;
            if(!isAdjacentFound){
                isAdjacentFound = isSymbolAdjacent(rowIdx, charIdx);
            }
        }

        // if char is not number
        if(Number.isNaN(Number(char)) || charIdx === charMaxIdx){
            const num = Number(currentNumber);
            // if prevChar was number and adjacent was found, add num to sum
            if(currentNumber.length > 0 && isAdjacentFound){
                console.log('adding ', num);
                sum += num;
            }
            currentNumber = "";
            isAdjacentFound = false;
            // else do nothing
        }
    })
});

console.log(sum);

function isSymbol(rowIdx: number, charIdx: number): boolean {
    const char = grid[rowIdx][charIdx];
    // if char is number, its not a symbol
    if(!Number.isNaN(Number(char))) return false;
    // if char is period, its not a symbol
    if(char === '.') return false;
    // else its a symbol
    return true;
}

function isSymbolAdjacent(rowIdx: number, charIdx: number): boolean {
    // check top row
    if(rowIdx > 0){
        if(charIdx > 0 && isSymbol(rowIdx - 1, charIdx - 1)) return true;
        if(isSymbol(rowIdx - 1, charIdx)) return true;
        if(charIdx < charMaxIdx && isSymbol(rowIdx - 1, charIdx + 1)) return true;
    }
    // check middle row
    if(charIdx > 0 && isSymbol(rowIdx, charIdx - 1)) return true;
    if(charIdx < charMaxIdx && isSymbol(rowIdx, charIdx + 1)) return true;
    // check bottom row
    if(rowIdx < rowMaxIdx){
        if(charIdx > 0 && isSymbol(rowIdx + 1, charIdx - 1)) return true;
        if(isSymbol(rowIdx + 1, charIdx)) return true;
        if(charIdx < charMaxIdx && isSymbol(rowIdx + 1, charIdx + 1)) return true;
    }
    // fallthrough
    return false;
}