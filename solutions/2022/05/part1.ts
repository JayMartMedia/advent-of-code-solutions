/**
 * From {YEAR} Advent of Code
 * Day {DAY}, part 1
 * https://adventofcode.com/{YEAR}/day/{DAY}
 *
 * Run with `npx ts-node ./part1.ts`
 */

import setupUtils from './utils';
setupUtils();
import input from './input'

const [startArrangment, stepString] = input.split("\n\n");

const stacks: string[][] = [];

const saLines = startArrangment.splitLines();
saLines.splice(saLines.length-1, 1); // remove line for specifying cols
saLines.reverse();

saLines.forEach(saLine => {
    for(let i = 0; i <= saLine.length; i += 4){
        if(!stacks[i/4]){
            stacks[i/4] = [];
        }
        const char = saLine[i+1];
        if(char !== ' '){
            stacks[i/4].push(char)
        }
    }
})

// console.log(stacks);

// start performing operations
const steps = stepString.splitLines();

steps.forEach(step => {
    // const [_, amount, _2, startCol, _3, endCol] = step.split(' ');
    const parts = step.split(' ');
    const amount = parts[1].toNum();
    const startCol = parts[3].toNum();
    const endCol = parts[5].toNum();
    const startStack = stacks[startCol - 1];
    const endStack = stacks[endCol - 1];
    for(let i = 0; i < amount; i += 1) {
        endStack.push(startStack.splice(startStack.length-1, 1)[0]);
    }
})
// console.log(steps)
// console.log(stacks);

let str = '';
stacks.forEach(stack => {
    str += stack[stack.length-1]
})

console.log(str)
