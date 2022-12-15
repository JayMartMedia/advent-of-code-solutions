/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../utils/ts/utils';
import input from './input';
setupUtils();

// split input
const sandStart = { col: 500, row: 0 };
const lines = input.splitLines();
const rockPathCoords = lines.map(line => line.split(' -> ').map(node => node.split(',').toNumsThrows()));

// calculate map borders
let lastRockHeight = 0;
let leftBorder = 500;
let rightBorder = 0;
for (let rockPathCoord of rockPathCoords) {
    for (let coord of rockPathCoord) {
        if (coord[1] > lastRockHeight) lastRockHeight = coord[1];
        if (coord[0] < leftBorder) leftBorder = coord[0] - 1;
        if (coord[0] > rightBorder) rightBorder = coord[0] + 1;
    }
}

// create infinite floor
leftBorder = 500-(lastRockHeight+50);
rightBorder = 500+(lastRockHeight+50);
rockPathCoords.push([[leftBorder, lastRockHeight+2],[rightBorder, lastRockHeight+2]])

// grid
const EMPTY_CHAR = '.';
const SAND_CHAR = 'O';
const ROCK_CHAR = '#';
const SAND_POUR_CHAR = '+';
interface Grid {
    [key: string]: string; // 0
}
const grid: Grid = {};
function getCell(col: number, row: number) {
    return grid[`${col},${row}`];
}
function setCell(col: number, row: number, val: string) {
    grid[`${col},${row}`] = val;
}
function printGrid() {
    let gridStr = ' ' + '_'.repeat(rightBorder - leftBorder + 1) + '\n';
    for (let row = 0; row <= lastRockHeight; row += 1) {
        let rowStr = '|';
        for (let col = leftBorder; col <= rightBorder; col += 1) {
            const cell = getCell(col, row);
            if (!cell) rowStr += EMPTY_CHAR;
            else rowStr += cell;
        }
        gridStr += rowStr + '|\n';
    }
    gridStr += '   abyss   '
    console.log(gridStr);
}

// put rock paths on grid
rockPathCoords.forEach(rockPath => {
    rockPath.forEach((coord, idx) => {
        // if there is another coord left to move towards
        if (rockPath[idx + 1]) {
            const from = rockPath[idx];
            const to = rockPath[idx + 1];
            if (from[0] === to[0]) {
                // same column
                if (from[1] < to[1]) {
                    for (let i = from[1]; i <= to[1]; i += 1) {
                        setCell(from[0], i, ROCK_CHAR);
                    }
                } else if (from[1] > to[1]) {
                    for (let i = from[1]; i >= to[1]; i -= 1) {
                        setCell(from[0], i, ROCK_CHAR);
                    }
                } else {
                    console.log('impossible to get to 2');
                }
            } else if (from[1] === to[1]) {
                // same row
                if (from[0] < to[0]) {
                    for (let i = from[0]; i <= to[0]; i += 1) {
                        setCell(i, from[1], ROCK_CHAR);
                    }
                } else if (from[0] > to[0]) {
                    for (let i = from[0]; i >= to[0]; i -= 1) {
                        setCell(i, from[1], ROCK_CHAR);
                    }
                } else {
                    console.log('impossible to get to 2');
                }
            } else {
                console.log('impossible to get to 1');
            }
        }
    })
});

function dropSand(): boolean {
    const sandPosition: { col: number, row: number } = { ...sandStart };
    let canMove = true;
    while (canMove) {
        // try to move down
        if (![ROCK_CHAR, SAND_CHAR].includes(getCell(sandPosition.col, sandPosition.row + 1))) {
            sandPosition.row = sandPosition.row + 1;
            // if (sandPosition.row > lastRockHeight) {
            //     return true;
            // }
            // try to move down left
        } else if (![ROCK_CHAR, SAND_CHAR].includes(getCell(sandPosition.col - 1, sandPosition.row + 1))) {
            sandPosition.col = sandPosition.col - 1;
            sandPosition.row = sandPosition.row + 1;
            // try to move down right
        } else if (![ROCK_CHAR, SAND_CHAR].includes(getCell(sandPosition.col + 1, sandPosition.row + 1))) {
            sandPosition.col = sandPosition.col + 1;
            sandPosition.row = sandPosition.row + 1;
        } else {
            if(getCell(sandPosition.col, sandPosition.row) === SAND_POUR_CHAR){
                return true;
            }
            canMove = false;
        }
    }
    setCell(sandPosition.col, sandPosition.row, SAND_CHAR);
    return false;
}

// for(let i = 0; i < 25; i += 1){
//     dropSand();
// }

function dropsUntilAbyss(): number {
    let amountOfDrops = 1;
    while (true) {
        if (dropSand()) return amountOfDrops;
        amountOfDrops += 1;
    }
}

// console.log(rockPathCoords);

setCell(sandStart.col, sandStart.row, SAND_POUR_CHAR)
const amountOfDrops = dropsUntilAbyss();
printGrid();
console.log(amountOfDrops);

// 25247 is too low
