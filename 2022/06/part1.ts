/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../utils/ts/src';
import input from './input';
setupUtils();

let c1 = '';
let c2 = '';
let c3 = '';
let c4 = '';

let finalIdx = 0;
for(let i = 0; i < input.length; i += 1){
    const char = input[i];
    c1 = c2;
    c2 = c3;
    c3 = c4;
    c4 = char;
    if(i>=3){
        const s = new Set([c1, c2, c3, c4])
        if(s.size === 4){
            finalIdx = i + 1;
            break;
        }
    }

}

// console.log(input);
console.log(finalIdx);