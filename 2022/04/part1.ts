/**
 * From {YEAR} Advent of Code
 * Day {DAY}, part 1
 * https://adventofcode.com/{YEAR}/day/{DAY}
 *
 * Run with `npx ts-node ./part1.ts`
 */

import input from './input'

const lines = input.split("\n");

const pairs = lines.map(line => {
    return line.split(',');
});

let totalCovered = 0;

pairs.forEach(pair => {
    const e1 = pair[0].split('-').map(e => Number(e));
    const e2 = pair[1].split('-').map(e => Number(e));

    let cov = false;


    if((e1[0] <= e2[0] && e1[1] >= e2[1])
        || (e2[0] <= e1[0] && e2[1] >= e1[1])){
        totalCovered += 1;
        cov = true;
    }
    console.log(e1, e2, cov)
})



console.log(totalCovered);
