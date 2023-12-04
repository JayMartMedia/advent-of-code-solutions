/**
 * From 2022 Advent of Code
 * Day 2, part 1
 * https://adventofcode.com/2022/day/2
 * 
 * Run with `npx ts-node ./02-part1.ts`
 */

//import input from './02-short-input'
import input from './02-input'

const inputStr: string = input;

const games = inputStr.split('\n');

function getValueFromGame(game: string) {
    const otherPlayer: string = game.split(' ')[0];
    const self: string = game.split(' ')[1];

    let gameScore = 0;
    if(self === 'X'){
        gameScore += 1;
        if(otherPlayer === 'C'){
            gameScore += 6;
        }else if(otherPlayer === 'A'){
            //tie
            gameScore += 3;
        }
    }else if(self === 'Y'){
        gameScore += 2;
        if(otherPlayer === 'A'){
            gameScore += 6;
        }else if(otherPlayer === 'B'){
            //tie
            gameScore += 3;
        }
    }else if(self === 'Z'){
        gameScore += 3;
        if(otherPlayer === 'B'){
            gameScore += 6;
        }else if(otherPlayer === 'C'){
            //tie
            gameScore += 3;
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