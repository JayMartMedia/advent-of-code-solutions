/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../utils/ts/src';
import input from './einput';
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

// iterate through the map looking for greatest pressure


console.log(JSON.stringify(valveMap, null, 2));