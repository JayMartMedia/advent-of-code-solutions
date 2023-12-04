/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../../utils/ts/src';
import input from './input';
setupUtils();

const rows = input.splitLines();
const trees = rows.join('').split('');
let numVisibleTres = 0;

const height = rows.length;
const width = rows[0].length;

function getTree(rowNum: number,colNum: number): string {
    return trees[width*rowNum+colNum];
}

function allTreesLeftAreSmaller (rowNum: number, colNum: number): boolean{
    const tree = getTree(rowNum, colNum);
    for(let j = 0; j < width-1; j += 1){
        if(colNum === j) continue;
        const treeInRow = getTree(rowNum, j) //trees[width*rowNum + j];
        if(j < colNum){
            if(treeInRow >= tree){
                return false;
            }
        }
    }
    return true;
}

function allTreesRightAreSmaller (rowNum: number, colNum: number): boolean{
    const tree = getTree(rowNum, colNum);
    for(let j = width-1; j >= 0; j -= 1){
        if(colNum === j) continue;
        const treeInRow = getTree(rowNum, j) //trees[width*rowNum + j];
        if(j > colNum){
            if(treeInRow >= tree){
                return false;
            }
        }
    }
    return true;
}

function allTreesAboveAreSmaller (rowNum: number, colNum: number): boolean{
    const tree = getTree(rowNum, colNum);
    for(let j = 0; j <= height-1; j += 1){
        if(rowNum === j) continue;
        const treeInCol = getTree(j, colNum) //trees[width*rowNum + j];
        if(j < rowNum){
            if(treeInCol >= tree){
                return false;
            }
        }
    }
    return true;
}

function allTreesBelowAreSmaller (rowNum: number, colNum: number): boolean{
    const tree = getTree(rowNum, colNum);
    for(let j = height - 1; j >= 0; j -= 1){
        if(rowNum === j) continue;
        const treeInCol = getTree(j, colNum) //trees[width*rowNum + j];
        if(j > rowNum){
            if(treeInCol >= tree){
                return false;
            }
        }
    }
    return true;
}

for(let i = 0; i < trees.length; i += 1){
    const tree = trees[i];
    let isVisible = false;
    const rowNum = Math.floor(i/width);
    const colNum = i%width;
    // check for edge
    if(rowNum === 0 || rowNum === width-1 || colNum === 0 || colNum === height-1){
        isVisible = true;
    }
    
    if(allTreesLeftAreSmaller(rowNum, colNum)){
        isVisible = true;
    }

    if(allTreesRightAreSmaller(rowNum, colNum)){
        isVisible = true;
    }

    if(allTreesAboveAreSmaller(rowNum, colNum)){
        isVisible = true;
    }

    if(allTreesBelowAreSmaller(rowNum, colNum)){
        isVisible = true;
    }

    // check to see if there is a higher num
    if(isVisible){
        if(rowNum === 0 || rowNum === width-1 || colNum === 0 || colNum === height-1){
            // don't log edges
        }else{
            //console.log('is visible:',rowNum, colNum, tree);
        }
        numVisibleTres += 1;
    }
}

// console.log(trees);
// console.log(height, width);
console.log(numVisibleTres);