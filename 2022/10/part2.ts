/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../utils/ts/src';
import input from './input';
setupUtils();

const lines = input.splitLines();
const cycles: string[] = [];

let xreg = 1;

function calc(num: number) {
    return (cycles.length) % 40
}

lines.forEach(line => {
    if (line === "noop") {
        if(xreg-1 <= calc(cycles.length) && calc(cycles.length) <= xreg+1){
            cycles.push('#');
        }else{
            cycles.push('.');
        }
    } else {
        const [_, value] = line.split(' ').toNums();
        if (xreg - 1 <= calc(cycles.length) && calc(cycles.length) <= xreg + 1) {
            cycles.push('#');
        } else {
            cycles.push('.');
        }
        if (xreg - 1 <= calc(cycles.length) && calc(cycles.length) <= xreg + 1) {
            cycles.push('#');
        } else {
            cycles.push('.');
        }
        xreg += value;
    }
});

console.log(cycles.join('').divide(6));
