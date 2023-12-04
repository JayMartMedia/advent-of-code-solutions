/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../../utils/ts/src';
import input from './input';
setupUtils();

const lines = input.splitLines();
const grid = lines.map(line => line.split(''));
const rowMaxIdx = grid.length - 1;
const charMaxIdx = grid[0].length - 1;

let sum: number = 0;
grid.forEach((row, rowIdx) => {
    row.forEach((char, charIdx) => {
        if (char === "*") {
            sum += calculateGearRatio(rowIdx, charIdx);
        }
    });
});

function calculateGearRatio(rowIdx: number, charIdx: number): number {
    let num1: number | null = null;
    let num2: number | null = null;
    // top row
    if(rowIdx > 0){
        // check top center
        if(isNum(grid[rowIdx - 1][charIdx])){
            // if top center, find full num
            let curCharIdx = charIdx;
            while(curCharIdx > 0 && isNum(grid[rowIdx - 1][curCharIdx - 1])){
                curCharIdx--;
            }
            let str: string = '';
            while(curCharIdx <= charMaxIdx && isNum(grid[rowIdx - 1][curCharIdx])){
                str += grid[rowIdx - 1][curCharIdx];
                curCharIdx++;
            }
            num1 = Number(str);
        }else{
            // else check top left and top right
            // check top left
            if(isNum(grid[rowIdx - 1][charIdx - 1])){
                let curCharIdx = charIdx - 1;
                while(curCharIdx > 0 && isNum(grid[rowIdx - 1][curCharIdx - 1])){
                    curCharIdx--;
                }
                let str: string = '';
                while(curCharIdx <= charMaxIdx && isNum(grid[rowIdx - 1][curCharIdx])){
                    str += grid[rowIdx - 1][curCharIdx];
                    curCharIdx++;
                }
                num1 = Number(str);
            }
            // check top right
            if(isNum(grid[rowIdx - 1][charIdx + 1])){
                let curCharIdx = charIdx + 1;
                let str: string = '';
                while(curCharIdx <= charMaxIdx && isNum(grid[rowIdx - 1][curCharIdx])){
                    str += grid[rowIdx - 1][curCharIdx];
                    curCharIdx++;
                }
                if(!num1){
                    num1 = Number(str);
                }else if(!num2){
                    num2 = Number(str);
                }else{
                    return 0;
                }
            }
        }      
    }

    // middle row
    // check left
    if(isNum(grid[rowIdx][charIdx - 1])){
        let curCharIdx = charIdx - 1;
        while(curCharIdx > 0 && isNum(grid[rowIdx][curCharIdx - 1])){
            curCharIdx--;
        }
        let str: string = '';
        while(curCharIdx <= charMaxIdx && isNum(grid[rowIdx][curCharIdx])){
            str += grid[rowIdx][curCharIdx];
            curCharIdx++;
        }
        if(!num1){
            num1 = Number(str);
        }else if(!num2){
            num2 = Number(str);
        }else{
            return 0;
        }
    }
    // check right
    if(isNum(grid[rowIdx][charIdx + 1])){
        let curCharIdx = charIdx + 1;
        let str: string = '';
        while(curCharIdx <= charMaxIdx && isNum(grid[rowIdx][curCharIdx])){
            str += grid[rowIdx][curCharIdx];
            curCharIdx++;
        }
        if(!num1){
            num1 = Number(str);
        }else if(!num2){
            num2 = Number(str);
        }else{
            return 0;
        }
    }

    // bottom row
    if(rowIdx < rowMaxIdx){
        // check bottom center
        if(isNum(grid[rowIdx + 1][charIdx])){
            // if bottom center, find full num
            let curCharIdx = charIdx;
            while(curCharIdx > 0 && isNum(grid[rowIdx + 1][curCharIdx - 1])){
                curCharIdx--;
            }
            let str: string = '';
            while(curCharIdx <= charMaxIdx && isNum(grid[rowIdx + 1][curCharIdx])){
                str += grid[rowIdx + 1][curCharIdx];
                curCharIdx++;
            }
            if(!num1){
                num1 = Number(str);
            }else if(!num2){
                num2 = Number(str);
            }else{
                return 0;
            }
        }else{
            // else check bottom left and bottom right
            // check bottom left
            if(isNum(grid[rowIdx + 1][charIdx - 1])){
                let curCharIdx = charIdx - 1;
                while(curCharIdx > 0 && isNum(grid[rowIdx + 1][curCharIdx - 1])){
                    curCharIdx--;
                }
                let str: string = '';
                while(curCharIdx <= charMaxIdx && isNum(grid[rowIdx + 1][curCharIdx])){
                    str += grid[rowIdx + 1][curCharIdx];
                    curCharIdx++;
                }
                if(!num1){
                    num1 = Number(str);
                }else if(!num2){
                    num2 = Number(str);
                }else{
                    return 0;
                }
            }
            // check bottom right
            if(isNum(grid[rowIdx + 1][charIdx + 1])){
                let curCharIdx = charIdx + 1;
                let str: string = '';
                while(curCharIdx <= charMaxIdx && isNum(grid[rowIdx + 1][curCharIdx])){
                    str += grid[rowIdx + 1][curCharIdx];
                    curCharIdx++;
                }
                if(!num1){
                    num1 = Number(str);
                }else if(!num2){
                    num2 = Number(str);
                }else{
                    return 0;
                }
            }
        }
    }

    if(num1 !== null && num2 !== null){
        return num1 * num2;
    }
    return 0;
}

console.log(sum);

function isNum(str: string) {
    return !Number.isNaN(Number(str));
}