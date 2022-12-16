/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../utils/ts/utils';
import input from './input';
setupUtils();

const lines = input.splitLines();

interface Sensor {
    x: number;
    y: number;
    beaconX: number;
    beaconY: number;
}

// const detectorRow = 10; // for example
const detectorRow = 2000000; // for real input

// parse input
// Sensor at x=9, y=16: closest beacon is at x=10, y=16
const sensors: Sensor[] = lines.map(line => {
    const numberPattern = /(-)?\d+/g;

    const res = line.match(numberPattern);
    if(res === null){
        throw Error('impossible to reach 1')
    }
    const [sx,sy,bx,by] = Array.from(res).toNumsThrows();
    return {
        x: sx,
        y: sy,
        beaconX: bx,
        beaconY: by
    }
});

function calculateManhattanDist(x1: number, y1: number, x2: number, y2: number): number {
    return Math.abs(x1-x2)+Math.abs(y1-y2);
}

// check how many cells on the row cannot have a beacon
const filledDetectorRowCells: Set<number> = new Set();
sensors.forEach(sensor => {
    const manhattanDistToBeacon = calculateManhattanDist(sensor.x, sensor.y, sensor.beaconX, sensor.beaconY);
    if(!Number.isSafeInteger(manhattanDistToBeacon)){
        console.log('too big');
    }
    for(let i = sensor.x-manhattanDistToBeacon; i <= sensor.x+manhattanDistToBeacon; i +=1){
        const manHatDistToRowCell = calculateManhattanDist(sensor.x, sensor.y, i, detectorRow);
        if(!Number.isSafeInteger(manHatDistToRowCell)){
            console.log('too big');
        }
        if(manHatDistToRowCell <= manhattanDistToBeacon){
            filledDetectorRowCells.add(i);
        }
    }
});

// if cell is marked as cannot have beacon and has beacon, remove it
sensors.forEach(sensor => {
    if(sensor.beaconY === detectorRow){
        filledDetectorRowCells.delete(sensor.beaconX);
    }
});

// console.log(Array.from(filledDetectorRowCells).sort((a,b) => a-b))
console.log(filledDetectorRowCells.size);