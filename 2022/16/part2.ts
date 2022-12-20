/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../utils/ts/src';
import input from './input';
setupUtils();

const lines = input.splitLines();

interface Valve {
    key: string;
    flowRate: number;
    connectedValves: string[];
}
type ValveMap = {
    [key: string]: Valve;
}

// populate the map
const valveMap: ValveMap = {};
lines.forEach(line => {
    const parts = line.split(' ');
    const key = parts[1];
    valveMap[key] = {
        key,
        flowRate: parts[4].split('=')[1].split(';')[0].toNumThrows(),
        connectedValves: parts.slice(9).map(connectedValve => connectedValve.split(',').join(''))
    };
});

interface Path {
    key: string;
    totalFlow: number;
    minutes: number;
    openValves: string[];
}
type PathMap = {
    [key: string]: Path
}

const pathMap: PathMap = {}

const MAX_MINUTES = 26;

const cache: {
    [key: string]: number;
} = {};

// iterate through the map looking for greatest pressure
function visitValve(valve: Valve, path: string, flow: number, minutes: number, openValves: string[]) {
    // if this state has already been checked, don't need to check again
    const cacheKey = `${valve.key},${minutes},${openValves.sort()}`;
    if(cache[cacheKey] !== undefined && flow <= cache[cacheKey]){
        return
    }else{
        // add to cache
        cache[cacheKey] = flow;
    }
    
    const newPath = `${path}/${valve.key}`;
    const remainingMinutes = MAX_MINUTES - minutes;
    // base case
    if(minutes >= MAX_MINUTES){
        const key = newPath;
        pathMap[key] = {
            key,
            totalFlow: flow,
            minutes,
            openValves
        }
        return;
    }

    // visit each connected node without turning on flow
    valve.connectedValves.forEach(_valveKey => {
        const _valve = valveMap[_valveKey];
        visitValve(_valve, newPath, flow, minutes + 1, openValves);
    });

    // (if flow isn't 0, and flow is not already on) turn on flow, then visit each connected node
    if(valve.flowRate === 0 || openValves.includes(valve.key)) return;
    valve.connectedValves.forEach(_valveKey => {
        const _valve = valveMap[_valveKey];
        const newFlow = flow + (valve.flowRate * (remainingMinutes));

        const newMinutes = minutes + 1;
        if(newMinutes < MAX_MINUTES){
            visitValve(_valve, newPath+'/o', newFlow, newMinutes + 1, [...openValves, valve.key]);
        }else{
            const key = newPath;
            pathMap[key] = {
                key,
                totalFlow: newFlow,
                minutes: minutes + 1,
                openValves: [...openValves, valve.key]
            }
        }
    });
}

visitValve(valveMap['AA'], '', 0, 1, []);

// get highest flow per arrangement of openValves
const highFlowPerValves: {
    [key: string]: number
} = {}
Object.keys(pathMap).forEach(pathKey => {
    const path = pathMap[pathKey];
    const highFlowPerValveKey = path.openValves.sort().join(',');
    const highFlowPerValve = highFlowPerValves[highFlowPerValveKey];
    if(highFlowPerValve === undefined || highFlowPerValve < path.totalFlow){
        highFlowPerValves[highFlowPerValveKey] = path.totalFlow;
    }
});

// returns false if arrays contain a duplicate open valve (since ele and me can't both open a valve)
// returns combined flow otherwise
function getMaxFlowForValveArrays(valveArrayStr1: string, valveArrayStr2: string): false | number {
    
    const valveArray1 = valveArrayStr1.split(',');
    const valveArray2 = valveArrayStr2.split(',');
    for(let i = 0; i < valveArray1.length; i += 1){
        if(valveArray2.includes(valveArray1[i])){
            return false;
        }
    }
    return highFlowPerValves[valveArrayStr1] + highFlowPerValves[valveArrayStr2];
}

// find max flow
const highFlowPerValveKeys = Object.keys(highFlowPerValves);
let max = 0;
for(let i = 0; i < highFlowPerValveKeys.length; i += 1){
    for(let j = i; j < highFlowPerValveKeys.length; j += 1){
        const res = getMaxFlowForValveArrays(highFlowPerValveKeys[i], highFlowPerValveKeys[j]);
        if(res && res > max){
            max = res;
        }
    }
}
console.log(max);