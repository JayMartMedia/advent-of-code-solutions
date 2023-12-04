/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../../utils/ts/src';
import input from './input';
setupUtils();

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const games = input.splitLines();

let sum = 0;
games.forEach(game => {
    // const gameId = Number(game.split(' ')[1].split(':')[0]);
    const gameId = Number(game.match(/Game (?<gameId>\d+):/)?.groups?.gameId);

    const sets = game.split(":")[1].split(';');
    for(let i = 0; i < sets.length; i += 1){
        const set = sets[i];
        const red = set.match(/(?<red>\d+) red/)?.groups?.red;
        const green = set.match(/(?<green>\d+) green/)?.groups?.green;
        const blue = set.match(/(?<blue>\d+) blue/)?.groups?.blue;
        if(
            (red && Number(red) > maxRed) ||
            (green && Number(green) > maxGreen) ||
            (blue && Number(blue) > maxBlue)
        ){
            return;
        }
    }
    // if not exited early, add to sum
    sum += gameId
});

console.log(sum);