/**
 * Run with `npx ts-node-dev --respawn ./part2.ts`
 */
 import { readFileSync } from 'fs';
 import setupUtils from '../../../utils/ts/src';
 
 // pass node env var or change the boolean below to load the example file
 const useExampleInput = process.env.EXAMPLE ?? true;
 const fileName = useExampleInput ? './einput.txt' : 'input.txt';
 const input = readFileSync(fileName, 'utf-8');
 setupUtils();
 // end setup
 
 const lines = input.splitLines('\r\n');
 
 console.log(input);
 console.log(lines);