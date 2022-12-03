/**
 * From 2022 Advent of Code
 * Day 2, part 2
 * https://adventofcode.com/2022/day/2
 * 
 * Run with `npx ts-node ./02-part2.ts`
 */

//import input from './02-short-input'
import input from './02-input'

const inputStr: string = input;

const games = inputStr.split('\n');

function getValueFromGame(game: string) {
    const otherPlayer: string = game.split(' ')[0];
    const gameResult: string = game.split(' ')[1];

    let gameScore = 0;
    if (gameResult === 'X') {
        // lose
        if (otherPlayer === 'A') {
            gameScore += 3;
        } else if (otherPlayer === 'B') {
            gameScore += 1;
        } else if (otherPlayer === 'C') {
            gameScore += 2;
        }
    } else if (gameResult === 'Y') {
        // tie
        gameScore += 3;
        if (otherPlayer === 'A') {
            gameScore += 1;
        } else if (otherPlayer === 'B') {
            gameScore += 2;
        } else if (otherPlayer === 'C') {
            gameScore += 3;
        }
    } else if (gameResult === 'Z') {
        //win
        gameScore += 6;
        if (otherPlayer === 'A') {
            gameScore += 2;
        } else if (otherPlayer === 'B') {
            gameScore += 3;
        } else if (otherPlayer === 'C') {
            gameScore += 1;
        }
    }

    return gameScore;
}

const gameScores = games.map(game => getValueFromGame(game));

let totalGameScore = 0;
gameScores.forEach(gameScore => {
    totalGameScore += gameScore;
})

console.log(totalGameScore);