/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
 import setupUtils from '../../utils/ts/src';
 import input from './input';
 setupUtils();
 
 const lines = input.split('\n');
 const calibrationValues = lines.map(line => {
     let firstDigit: number | undefined;
     let lastDigit: number | undefined;
     line.split('').forEach((char, idx) => {
         try{
             let num = Number(char);
             const numStr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
             const substr = line.substring(idx);
             const foundNumStr = numStr.filter(numStrIns => substr.startsWith(numStrIns))[0];
             if(foundNumStr){
                num = numStr.indexOf(foundNumStr);
             }
             if(Number.isNaN(num)) return;
             if(!firstDigit){
                 firstDigit = num;
             }
             lastDigit = num;
         }catch(e){}
     });
     return Number(`${firstDigit}${lastDigit}`)
 });
 
 let total = 0;
 calibrationValues.forEach(calibrationValue => {
     total += calibrationValue;
 });
 
 console.log(total);
 