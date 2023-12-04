/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../../utils/ts/src';
import input from './input';
setupUtils();

const lines = input.splitLines();
const cycles: number[] = [1];

let xreg = 1;

lines.forEach(line => {
    if(line === "noop") {
        cycles.push(xreg);
    }else{
        const [_, value] = line.split(' ').toNums();
        cycles.push(xreg);
        cycles.push(xreg);
        xreg += value;
    }
});

console.log(
    cycles[20] * 20 +
    cycles[60] * 60 +
    cycles[100] * 100 +
    cycles[140] * 140 +
    cycles[180] * 180 +
    cycles[220] * 220
);
