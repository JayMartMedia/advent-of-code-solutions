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
     line.split('').forEach(char => {
         try{
             const num = Number(char);
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
 