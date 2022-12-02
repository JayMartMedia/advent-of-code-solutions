/**
 * From 2022 Advent of Code
 * Day 1, part 1
 * https://adventofcode.com/2022/day/1
 * 
 * Run with `node ./01-part1.js`
 */

const input = require('./01-input');

const lines = input.split('\n');

let elves = [];

let currentCalories = 0;
for(const line of lines){
    const numCal = Number(line);
    if(numCal > 0) {
        currentCalories += numCal;
    }else{
        elves.push(currentCalories);
        currentCalories = 0;
    }
}

let maxElf = 0;
for(const elf of elves){
    if(elf > maxElf){
        maxElf = elf;
    }
}

console.log(maxElf);