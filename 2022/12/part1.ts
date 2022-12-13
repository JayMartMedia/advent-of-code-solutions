/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../utils/ts/utils';
import input from './input';
setupUtils();

// setup grid
interface Grid {
    height: number;
    width: number;
    cells: string[][];
    getCell(row: number, col: number): string;
    toString(): string;
    toStringPath(onPath: string[]): string;
}

const grid: Grid = {
    height: input.splitLines().length,
    width: input.splitLines()[0].trim().length,
    cells: input.splitLines().map(line => line.trim().split('')),
    getCell: function(row, col): string{
        return this.cells[row][col];
    },
    toString: function(): string {
        return this.cells.map(row => row.join('')).join('\n')
    },
    toStringPath: function(onPath: string[]): string {
        if(!onPath) return 'no onPath provided';
        let str = '';
        for(let i = 0; i < this.cells.length; i += 1) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j += 1) {
                if(onPath.includes(`${i},${j}`)){
                    str += '\x1b[36m' + String.fromCharCode(this.cells[i][j].charCodeAt(0)-32) + '\x1b[0m';
                }else{
                    str += this.cells[i][j];
                }
            }
            str += '\n';
        }
        return str;
    }
}

// setup tracking
interface VisitedCell {
    distFromStart: number;
    path: string[];
}
interface Visited {
    [key: string]: VisitedCell;
}
const visited: Visited = {};

const done = false;

// get starting point
function findStart(): {row: number, col: number} {
    for(let i = 0; i < grid.height; i += 1){
        for(let j = 0; j < grid.width; j += 1){
            if(grid.getCell(i,j) === 'S'){
                return {row: i, col: j}
            }
        }
    }
    return {row: -1, col: -1};
}
const startingCell: {row: number, col: number} = findStart();
const possibleSolution: Visited = {};

// move through grid
function visitNeighbors(row: number, col: number, distFromStart: number, path: string[], lastHeight: string){
    const newHeight = grid.getCell(row, col);
    const newPath = [...path, `${row},${col}`];

    if((lastHeight === 'y' || lastHeight === 'z') && newHeight === 'E'){
        if(possibleSolution[`${row},${col}`] && possibleSolution[`${row},${col}`].distFromStart < distFromStart){
            return;
        }
        possibleSolution[`${row},${col}`] = {
            distFromStart: distFromStart,
            path: newPath
        };
    }

    if(newHeight.ascii() > lastHeight.ascii()+1 && lastHeight !== 'S'){
        //console.log('too high', newHeight, lastHeight);
        return;
    }

    const newDistFromStart = distFromStart + 1;
    if(visited[`${row},${col}`] && visited[`${row},${col}`].distFromStart <= distFromStart){
        return;
    }
    visited[`${row},${col}`] = {
        distFromStart: distFromStart,
        path: newPath
    };

    // visit top neighbor
    if(row !== 0){
        visitNeighbors(row-1, col, newDistFromStart, newPath, newHeight);
    }

    // visit right neighbor
    if(col !== grid.width-1){
        visitNeighbors(row, col+1, newDistFromStart, newPath, newHeight);
    }

    // visit down neighbor
    if(row !== grid.height-1){
        visitNeighbors(row+1, col, newDistFromStart, newPath, newHeight);
    }

    // visit left neighbor
    if(col !== 0){
        visitNeighbors(row, col-1, newDistFromStart, newPath, newHeight);
    }
}

visitNeighbors(startingCell.row, startingCell.col, 0, [], 'a');


const arr = Array.from(Object.entries(possibleSolution).sort((a, b) => a[1].distFromStart - b[1].distFromStart));
console.log(grid.toStringPath(possibleSolution[arr[0][0]]?.path));
console.log(arr[0][1].distFromStart);

// answer is 440