/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../utils/ts/src';
import input from './input';
setupUtils();

const lines = input.splitLines();
const cubes = lines.map(line => {
    const [x,y,z] = line.split(',').toNumsThrows();
    return {
        x,
        y,
        z
    }
});

const walls: {
    [key: string]: number
} = {};
function addWall(wallKey: string): void {
    if(walls[wallKey]){
        walls[wallKey] += 1;
    }else{
        walls[wallKey] = 1;
    }
}

cubes.forEach(cube => {
    // add each wall 
    addWall(`${cube.x+.5},${cube.y},${cube.z}`);
    addWall(`${cube.x-.5},${cube.y},${cube.z}`);
    addWall(`${cube.x},${cube.y+.5},${cube.z}`);
    addWall(`${cube.x},${cube.y-.5},${cube.z}`);
    addWall(`${cube.x},${cube.y},${cube.z+.5}`);
    addWall(`${cube.x},${cube.y},${cube.z-.5}`);
});

let exposedWalls = 0;
Object.keys(walls).forEach(key => {
    if(walls[key] === 1){
        exposedWalls += 1;
    }
});

console.log(exposedWalls);