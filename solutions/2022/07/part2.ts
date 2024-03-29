/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
 import setupUtils from '../../../utils/ts/src';
 import input from './input';
 setupUtils();
 
 // parse input
 const lines = input.splitLines();
 
 function isCommand(line: string) {
     return line.startsWith('$');
 }
 
 // gen tree
 const tree: any = {};
 let currentDir = ''
 for(let line of lines) {
     if(isCommand(line)){
         if(line === '$ cd /') continue;
         if(line === '$ ls') continue;
         if(line.startsWith('$ cd')) {
             const arg = line.split(' ')[2];
             if(arg === '..'){
                 currentDir = currentDir.split('/').slice(0,currentDir.split('/').length-1).join('/');
             }else{
                 currentDir += `/${arg}`;
             }
         }
     }else{
         const [sizeOrDir, name] = line.split(' '); // 'dir d' || '1234123 b.txt'
         if(currentDir === ''){
             if(sizeOrDir === 'dir'){
                 tree[name] = {}
             }else{
                 tree[name] = sizeOrDir;
             }
         }else{
             let dirToAddIn = tree;
             for(let dir of currentDir.split('/')){
                 if (dir === '') continue;
                 dirToAddIn = dirToAddIn[dir];
             }
             if(sizeOrDir === 'dir'){
                 dirToAddIn[name] = {};
             }else{
                 dirToAddIn[name] = sizeOrDir;
             }
         }
         // add to dir
     }
 }
 
 // console.log(JSON.stringify(tree, null, 2));
 
 // get sizes
 const maxSize = 100000;
 const dirsLessThanMaxSize: number[] = [];
 const dirSizes: number[] = [];
 
 function recurseTree (node: any) {
     let totalSize = 0;
     if(typeof node === 'string'){
         return node.toNumThrows();
     }else{
         for(let key of Object.keys(node)){
             totalSize += recurseTree(node[key]);
         }
     }
     if(totalSize <= maxSize){
         dirsLessThanMaxSize.push(totalSize);
     }
     dirSizes.push(totalSize);
     return totalSize;
 }
 
 const totalSystemSize = 70000000;
 const neededUnusedSize = 30000000;
 const totalUsedSize = recurseTree(tree);
 const totalUnusedSize = totalSystemSize - totalUsedSize;
 const dirSizeToDelete = totalUsedSize - (totalSystemSize - neededUnusedSize) // find a dir close to this

 // console.log(dirsLessThanMaxSize);
//  console.log(dirSizeToDelete)
//  console.log(totalUsedSize)
//  console.log(totalUnusedSize)
//  console.log(dirsLessThanMaxSize.sum()) // answer for p1

// find closest to total
const orderedDirs = dirSizes.sort((a,b) => a - b);

console.log(orderedDirs.find(dir => {
    return dir > dirSizeToDelete;
}))


// 10242215 not correct p2
 
 // 42655936 not correct p1
 // 1583951 correct p1