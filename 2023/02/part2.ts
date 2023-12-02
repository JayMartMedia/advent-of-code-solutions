/**
 * Run with `npx ts-node-dev --respawn ./part2.ts`
 */
import setupUtils from '../../utils/ts/src';
import input from './input';
setupUtils();

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const games = input.splitLines();

let sum = 0;
let sumPower = 0;
games.forEach(game => {
    // const gameId = Number(game.split(' ')[1].split(':')[0]);
    let hasEnough = true;
    const gameId = Number(game.match(/Game (?<gameId>\d+):/)?.groups?.gameId);

    // part2 counters
    let minRedForGame = 0;
    let minGreenForGame = 0;
    let minBlueForGame = 0;

    const sets = game.split(":")[1].split(';');
    for (let i = 0; i < sets.length; i += 1) {
        const set = sets[i];
        const red = set.match(/(?<red>\d+) red/)?.groups?.red;
        const green = set.match(/(?<green>\d+) green/)?.groups?.green;
        const blue = set.match(/(?<blue>\d+) blue/)?.groups?.blue;
        if (
            (red && Number(red) > maxRed) ||
            (green && Number(green) > maxGreen) ||
            (blue && Number(blue) > maxBlue)
        ) {
            hasEnough = false;
        }

        // part2 increase counters
        if(red && Number(red) > minRedForGame) minRedForGame = Number(red);
        if(green && Number(green) > minGreenForGame) minGreenForGame = Number(green);
        if(blue && Number(blue) > minBlueForGame) minBlueForGame = Number(blue);
    }
    // if not exited early, add to sum
    if (hasEnough) {
        sum += gameId
    }
    const power = minRedForGame * minGreenForGame * minBlueForGame;
    sumPower += power;
});

console.log('part1: ',sum);
console.log('part2: ',sumPower);