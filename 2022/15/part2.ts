/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../utils/ts/src';
import input from './input';
setupUtils();

const lines = input.splitLines();

interface Sensor {
    x: number;
    y: number;
    beaconX: number;
    beaconY: number;
}

const detectorRow = 2000000;

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

const min = 0;
// const max = 20; // for example
const max = 4000000; // for real input

function isOutOfRange(x: number, y: number): true | number {
    for(let sensor of sensors){
        const manhattanDistToBeacon = calculateManhattanDist(sensor.x, sensor.y, sensor.beaconX, sensor.beaconY);
        const manHatDistToPossibility = calculateManhattanDist(sensor.x, sensor.y, x, y);
        if(manhattanDistToBeacon >= manHatDistToPossibility){
            return Math.abs(manhattanDistToBeacon - manHatDistToPossibility);
        }
    }
    return true;
}

function findBeaconLocation(): null | {x: number; y: number} {
    let i = 1;
    for(let x = min; x <= max; x += 1){
        if(x%40000 === 0){
            console.log(`progress: ${i}/100`);
            i += 1;
        }
        for(let y: number = min; y <= max; y += 1){
            const distOutOfRange = isOutOfRange(x,y);
            if(distOutOfRange === true){
                return {x,y};
            }else{
                y += distOutOfRange;
            }
        }
    }
    return null;
}

const beaconLocation = findBeaconLocation();
console.log(beaconLocation);
if(beaconLocation) {
    const tuningFreq = beaconLocation.x * 4000000 + beaconLocation.y;
    console.log(tuningFreq);
}else{
    console.log('no tuning freq found');
}