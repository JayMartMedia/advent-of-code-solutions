/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
 import setupUtils from '../../../utils/ts/src';
 import input from './input';
 setupUtils();
 
 let c1 = '';
 let c2 = '';
 let c3 = '';
 let c4 = '';
 let c5 = '';
 let c6 = '';
 let c7 = '';
 let c8 = '';
 let c9 = '';
 let c10 = '';
 let c11 = '';
 let c12 = '';
 let c13 = '';
 let c14 = '';
 
 let finalIdx = 0;
 for(let i = 0; i < input.length; i += 1){
     const char = input[i];
     c1 = c2;
     c2 = c3;
     c3 = c4;
     c4 = c5;
     c5 = c6;
     c6 = c7;
     c7 = c8;
     c8 = c9;
     c9 = c10;
     c10 = c11;
     c11 = c12;
     c12 = c13;
     c13 = c14;
     c14 = char;
    
     if(i>=13){
         const s = new Set([c1, c2, c3, c4, c5,c6,c7,c8,c9,c10,c11,c12,c13,c14])
         if(s.size === 14){
             finalIdx = i + 1;
             break;
         }
     }
 
 }
 
 // console.log(input);
 console.log(finalIdx);
