/**
 * From 2022 Advent of Code
 * Day 3, part 2
 * https://adventofcode.com/2022/day/3
 *
 * Run with `npx ts-node ./part2.ts`
 */

import input from './input'

const lines = input.split('\n');

function toPoints(char: any) {
    const v = char.charCodeAt(0);
    if (65 <= v && v <= 90) {
        return v - 38;
    } else {
        return v - 96
    }
}

const groups: string[] = [];
// find common
let breakout = false;
for(let i = 0; i < lines.length; i += 3){
    let l1 = lines[i];
    let l2 = lines[i+1];
    let l3 = lines[i+2];
    for(let c1 of l1){
        if (breakout) break;
        for(let c2 of l2){
            if (breakout) break;
            if(c1 !== c2) continue;
            for(let c3 of l3){
                if(breakout) break;
                if( c1 === c2 && c1 === c3){
                    groups.push(c1)
                    breakout = true;
                }
            }
        }
    }
    breakout = false;
}

const sums = groups.map(toPoints);

let total = 0;

sums.forEach(val => {
    total += val;
})
console.log(total);
