/**
 * From 2022 Advent of Code
 * Day 3, part 1
 * https://adventofcode.com/2022/day/3
 *
 * Run with `npx ts-node ./part1.ts`
 */

import input from './input'

const lines = input.split('\n');

const splitLines = lines.map(line => {
    const a = line.substring(0,line.length/2);
    const b = line.substring(line.length/2);
    return [a,b];
});

const chars = splitLines.map(splitLine => {
    const f = splitLine[0];
    const s = splitLine[1];
    for(let c of f){
        for(let c2 of s){
            if(c === c2){
                return c;
            }
        }
    }
    return null;
});

function toPoints(char: any) {
    const v = char.charCodeAt(0);
    if(65 <= v && v <= 90){
        return v-38;
    }else{
        return v-96
    }
}

const vals = chars.map(toPoints);

let total = 0;

vals.forEach(val => {
    total += val;
})
console.log(total);
