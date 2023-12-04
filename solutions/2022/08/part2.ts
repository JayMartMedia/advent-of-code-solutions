/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
 import setupUtils from '../../utils/ts/src';
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
 
//  function allTreesLeftAreSmaller (rowNum: number, colNum: number): boolean{
//      const tree = getTree(rowNum, colNum);
//      for(let j = 0; j < width-1; j += 1){
//          if(colNum === j) continue;
//          const treeInRow = getTree(rowNum, j) //trees[width*rowNum + j];
//          if(j < colNum){
//              if(treeInRow >= tree){
//                  return false;
//              }
//          }
//      }
//      return true;
//  }
 
//  function allTreesRightAreSmaller (rowNum: number, colNum: number): boolean{
//      const tree = getTree(rowNum, colNum);
//      for(let j = width-1; j >= 0; j -= 1){
//          if(colNum === j) continue;
//          const treeInRow = getTree(rowNum, j) //trees[width*rowNum + j];
//          if(j > colNum){
//              if(treeInRow >= tree){
//                  return false;
//              }
//          }
//      }
//      return true;
//  }
 
//  function allTreesAboveAreSmaller (rowNum: number, colNum: number): boolean{
//      const tree = getTree(rowNum, colNum);
//      for(let j = 0; j <= height-1; j += 1){
//          if(rowNum === j) continue;
//          const treeInCol = getTree(j, colNum) //trees[width*rowNum + j];
//          if(j < rowNum){
//              if(treeInCol >= tree){
//                  return false;
//              }
//          }
//      }
//      return true;
//  }
 
//  function allTreesBelowAreSmaller (rowNum: number, colNum: number): boolean{
//      const tree = getTree(rowNum, colNum);
//      for(let j = height - 1; j >= 0; j -= 1){
//          if(rowNum === j) continue;
//          const treeInCol = getTree(j, colNum) //trees[width*rowNum + j];
//          if(j > rowNum){
//              if(treeInCol >= tree){
//                  return false;
//              }
//          }
//      }
//      return true;
//  }


// this finally works
 function treesInViewLeft(rowNum: number, colNum: number): number {
    const tree = getTree(rowNum, colNum);
    if(colNum === 0) return 0;
    for(let i = colNum - 1; i >= 0; i--){
        const treeInRow = getTree(rowNum, i);
        if(treeInRow >= tree){
            return colNum - i;
        }
    }

    return colNum;
 }

 function treesInViewRight(rowNum: number, colNum: number): number {
    const tree = getTree(rowNum, colNum);
    if(colNum === width-1) return 0;
    for(let i = colNum + 1; i <= width-1; i++){
        const treeInRow = getTree(rowNum, i);
        if(treeInRow >= tree){
            return i - colNum;
        }
    }

    return width - 1 - colNum;
 }

 function treesInViewAbove(rowNum: number, colNum: number): number {
    const tree = getTree(rowNum, colNum);
    if(rowNum === 0) return 0;
    for(let i = rowNum - 1; i >= 0; i--){
        const treeInCol = getTree(i, colNum);
        if(treeInCol >= tree){
            return rowNum - i;
        }
    }

    return rowNum;
 }

 function treesInViewBelow(rowNum: number, colNum: number): number {
    const tree = getTree(rowNum, colNum);
    if(rowNum === 0) return 0;
    for(let i = rowNum + 1; i <= height-1; i++){
        const treeInCol = getTree(i, colNum);
        if(treeInCol >= tree){
            return i - rowNum;
        }
    }

    return height - 1 - rowNum;
 }
 

 let maxTreesInView = 0;
 for(let i = 0; i < trees.length; i += 1){
     const tree = trees[i];
    //  let treesInView = 0;
     const rowNum = Math.floor(i/width);
     const colNum = i%width;
     const numTreesInViewLeft = treesInViewLeft(rowNum, colNum);
     const numTreesInViewRight = treesInViewRight(rowNum, colNum);
     const numTreesInViewAbove = treesInViewAbove(rowNum, colNum);
     const numTreesInViewBelow = treesInViewBelow(rowNum, colNum);
     //console.log(rowNum, colNum, numTreesInViewRight);

     const treesInView = numTreesInViewLeft * numTreesInViewRight * numTreesInViewAbove * numTreesInViewBelow;

     if(treesInView > maxTreesInView){
        maxTreesInView = treesInView;
     }
 }
 
 // console.log(trees);
 // console.log(height, width);
 console.log(maxTreesInView);