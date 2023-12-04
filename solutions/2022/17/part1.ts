/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../../utils/ts/src';
import input from './input';
setupUtils();

const jets = input.split('');
const rockTypes = [['@@@@'],['.@.','@@@','.@.'],['@@@','..@','..@'],['@','@','@','@'],['@@','@@']];

const EMPTY_SPACE = '.';
const MOVING_ROCK = '@';
const STOPPED_ROCK = '#';

const grid: string[][] = [];
function getCell (row: number, col: number): string {
    return grid[row][col];
}
function setCell (row: number, col: number, value: string): void {
    grid[row][col] = value;
}
function newRow (): void {
    grid.push([EMPTY_SPACE,EMPTY_SPACE,EMPTY_SPACE,EMPTY_SPACE,EMPTY_SPACE,EMPTY_SPACE,EMPTY_SPACE]);
}
function printGrid () {
    let str = '';
    for(let i = grid.length - 1; i >= 0; i -= 1) {
        const row = grid[i];
        str += row.join('') + '\n';
    }
    console.log(str);
}

function log (...params: any[]){
    if(false) console.log(params);
}

//let highestRock = 0; // track the floor or highest rock
let movingRock = false; // state machine whether moving a current rock, or spawning new rock
let rockIdx = 0; // keep track to see which rock gets spawned next
let jetIdx = 0; // keep track to see which jet will be used next
let stoppedRocks = 0;
while(stoppedRocks < 2022){
    // if not currently moving rock, spawn a new rock
    if(!movingRock){
        log('spawning rock');
        spawnRock();
    }else{
        log('moving rock');
        // move the currently moving rock
        // jet
        const jet = jets[jetIdx];
        jetIdx = (jetIdx + 1) % jets.length;
        // check if moving left will result in a moving rock overlapping a stopped rock or wall
        if(!movingRocksWillOverlap(jet)){
            log('jet not interfered');
            // if not, move rock
            moveFallingRocks(jet);
        }else{
            log('jet interfered');
        }
        
        // move down
        // check if moving down will result in a moving rock overlapping a stopped rock or floor
        if(!movingRocksWillOverlap('v')){
            // if not, move down
            moveFallingRocks('v');
            log('moving rocks down');
        }else{
            // if yes, change moving to stopped, set moving rock to false
            freezeFallingRocks();
            movingRock = false;
            log('freezing rocks');
        }
    }
}

function calculateHighestRock (): number {
    for(let i = 0; i < grid.length; i += 1) {
        const row = grid[i];
        if(!row.includes(STOPPED_ROCK)){
            return i;
        }
    }
    return 0;
}

function spawnRock () {
    movingRock = true;
    const newRock = rockTypes[rockIdx];
    rockIdx = (rockIdx + 1) % rockTypes.length;
    const highestRock = calculateHighestRock();
    // if high rock is taller than grid, add some more rows to grid
    if(highestRock >= grid.length - 7){
        newRow();
        newRow();
        newRow();
    }
    for(let i = newRock.length - 1; i >= 0; i -= 1) {
        newRow();
        const rockRow = newRock[i];
        for(let j = 0; j < rockRow.length; j += 1) {
            setCell(highestRock+3+i, j + 2, rockRow[j]);
        }
    }
}

// direction could be ['<','>','v']
function movingRocksWillOverlap (direction: string): boolean {
    for(let rowNum = 0; rowNum < grid.length; rowNum += 1){
        for(let colNum = 0; colNum < grid[0].length; colNum += 1) {
            if(getCell(rowNum, colNum) === MOVING_ROCK){
                if(direction === '<'){
                    // will go off left side
                    if(colNum === 0) return true;
                    // will contact rock to left
                    if(getCell(rowNum, colNum-1) === STOPPED_ROCK) return true;
                }else if(direction === '>'){
                    // will go off right side
                    if(colNum === grid[0].length-1) return true;
                    // will contact rock to right
                    if(getCell(rowNum, colNum+1) === STOPPED_ROCK) return true;
                }else if(direction === 'v'){
                    // will go off bottom
                    if(rowNum === 0) return true;
                    // will contact rock below
                    if(getCell(rowNum-1, colNum) === STOPPED_ROCK) return true;
                }else{
                    throw Error('should not reach here 1');
                }
            }
        }
    }
    return false;
}

// direction could be ['<','>','v']
function moveFallingRocks (direction: string): void {
    for(let rowNum = 0; rowNum < grid.length; rowNum += 1){
        if(direction === '>'){
            for(let colNum = grid[0].length - 1; colNum >= 0; colNum -= 1){
                if(getCell(rowNum, colNum) === MOVING_ROCK){
                    // set rock to the right
                    setCell(rowNum, colNum + 1, MOVING_ROCK);
                    setCell(rowNum, colNum, EMPTY_SPACE);
                }
            }
            }else{
            for(let colNum = 0; colNum < grid[0].length; colNum += 1) {
                if(getCell(rowNum, colNum) === MOVING_ROCK){
                    if(direction === '<'){
                        // set rock to the left
                        setCell(rowNum, colNum-1, MOVING_ROCK);
                        setCell(rowNum, colNum, EMPTY_SPACE);
                    }else if(direction === 'v'){
                        // set rock below
                        setCell(rowNum-1, colNum, MOVING_ROCK);
                        setCell(rowNum, colNum, EMPTY_SPACE);
                    }else{
                        throw Error('should not reach here 1');
                    }
                }
            }
        }
    }
}

function freezeFallingRocks (): void {
    for(let rowNum = 0; rowNum < grid.length; rowNum += 1){
        for(let colNum = 0; colNum < grid[0].length; colNum += 1) {
            if(getCell(rowNum, colNum) === MOVING_ROCK){
                setCell(rowNum, colNum, STOPPED_ROCK);
            }
        }
    }
    stoppedRocks += 1;
}

printGrid();
console.log(calculateHighestRock());
console.log('done');