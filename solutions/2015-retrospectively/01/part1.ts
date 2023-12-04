/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../../utils/ts/src';
import input from './input';
setupUtils();

const chars = input.split('');

let currentFloor = 0;

chars.forEach(char => {
    if(char === '('){
        currentFloor += 1;
    }else if(char === ')'){
        currentFloor -= 1;
    }
});

console.log(currentFloor);
