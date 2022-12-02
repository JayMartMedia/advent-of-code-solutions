/**
 * From 2022 Advent of Code
 * Day 1, part 2
 * https://adventofcode.com/2022/day/1
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

const sortedElves = elves.sort((a, b) => b - a);

const topThreeElves = sortedElves[0] + sortedElves[1] + sortedElves[2];

console.log(topThreeElves);