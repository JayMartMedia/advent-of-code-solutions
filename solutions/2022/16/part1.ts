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
}
type PathMap = {
    [key: string]: Path
}

const pathMap: PathMap = {}

const MAX_MINUTES = 30;

const cache: {
    [key: string]: number;
} = {};

// iterate through the map looking for greatest pressure
function visitValve(valve: Valve, path: string, flow: number, minutes: number, openValves: string[]) {
    // if this state has already been checked, don't need to check again
    const cacheKey = `${valve.key},${minutes},${openValves.sort()}`;
    if(cache[cacheKey] !== undefined && flow <= cache[cacheKey]){
        //console.log('cache hit');
        return
    }else{
        // add to cache
        //console.log('cache miss');
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
            minutes
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
                minutes: minutes + 1
            }
        }
    });
}

visitValve(valveMap['AA'], '', 0, 1, []);


// console.log(JSON.stringify(valveMap, null, 2));
// console.log(JSON.stringify(pathMap, null, 2));
let maxFlow = 0;
let maxFlowPath = '';
Object.keys(pathMap).forEach(key => {
    const _v = pathMap[key];
    if(_v.totalFlow > maxFlow){
        maxFlow = _v.totalFlow;
        maxFlowPath = key;
    }
});

console.log(maxFlow);
console.log(maxFlowPath);