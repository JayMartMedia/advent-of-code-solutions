/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../utils/ts/utils';
import input from './einput';
setupUtils();

interface Position {
    x: number;
    y: number;
}

const lines = input.splitLines();
const movements: {direction: string, amount: number}[] = lines.map(line => {
    const [direction, amount] = line.split(' ');
    return {
        direction,
        amount: amount.toNumThrows()
    }
});

const headPosition: Position = {x:0,y:0};
const tailPosition: Position = {x:0,y:0};

// U L D R

const directionLogic = {
    U: (position: Position) => {
        return {
            x: position.x,
            y: position.y + 1
        }
    },
    R: (position: Position) => {
        return {
            x: position.x + 1,
            y: position.y
        }
    },
    D: (position: Position) => {
        return {
            x: position.x,
            y: position.y - 1
        }
    },
    L: (position: Position) => {
        return {
            x: position.x - 1,
            y: position.y
        }
    }
}

movements.forEach(movement => {
    for(let i = 0; i < movement.amount; i += 1){
        // move head
        const newHeadPosition = directionLogic[movement.direction](headPosition);
        console.log(newHeadPosition)
    }
});

console.log(movements);