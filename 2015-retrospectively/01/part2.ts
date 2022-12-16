/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../utils/ts/src';
import input from './input';
setupUtils();

const chars = input.split('');

let currentFloor = 0;
let firstToEnterBasement: null | number = null;

for (let i = 0; i < chars.length; i += 1) {
    const char = chars[i];
    if (char === '(') {
        currentFloor += 1;
    } else if (char === ')') {
        currentFloor -= 1;
    }
    if (currentFloor === -1) {
        firstToEnterBasement = i + 1;
        break;
    }
};

console.log(firstToEnterBasement);
