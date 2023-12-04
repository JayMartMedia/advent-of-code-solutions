/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../../utils/ts/src';
import input from './einput';
setupUtils();

const lines = input.splitLines();
const cubes = lines.map(line => {
    const [x, y, z] = line.split(',').toNumsThrows();
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
    if (walls[wallKey]) {
        walls[wallKey] += 1;
    } else {
        walls[wallKey] = 1;
    }
}

cubes.forEach(cube => {
    // add each wall 
    addWall(`${cube.x + .5},${cube.y},${cube.z}`);
    addWall(`${cube.x - .5},${cube.y},${cube.z}`);
    addWall(`${cube.x},${cube.y + .5},${cube.z}`);
    addWall(`${cube.x},${cube.y - .5},${cube.z}`);
    addWall(`${cube.x},${cube.y},${cube.z + .5}`);
    addWall(`${cube.x},${cube.y},${cube.z - .5}`);
});

function isInterior(key: string): boolean {
    const [x,y,z] = key.split(',').toNumsThrows();
    let foundGreater = false;
    let foundLesser = false;
    Object.keys(walls).forEach(_key => {
        const [_x,_y,_z] = _key.split(',').toNumsThrows();
        if(!Number.isInteger(x)){
            if(y === _y && z === _z){
                if(_x > x) foundGreater = true;
                if(_x < x) foundLesser = true;
            }
        }else if(!Number.isInteger(y)){
            if(x === _x && z === _z){
                if(_y > y) foundGreater = true;
                if(_y < y) foundLesser = true;
            }
        }else if(!Number.isInteger(z)){
            if(x === _x && y === _y){
                if(_z > z) foundGreater = true;
                if(_z < z) foundLesser = true;
            }
        }else{
            throw Error('impossible to reach 1');
        }
    });
    return foundGreater && foundLesser;
}

let exposedWalls = 0;
Object.keys(walls).forEach(key => {
    if (walls[key] === 1) {
        if (!isInterior(key)) {
            exposedWalls += 1;
        }
    }
});

console.log(walls)

console.log(exposedWalls);