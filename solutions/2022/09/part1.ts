/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../../utils/ts/src';
import input from './input';
setupUtils();

interface Position {
    x: number;
    y: number;
}

const lines = input.splitLines();
const movements: { direction: string, amount: number }[] = lines.map(line => {
    const [direction, amount] = line.split(' ');
    return {
        direction,
        amount: amount.toNumThrows()
    }
});

let headPosition: Position = { x: 0, y: 0 };
let tailPosition: Position = { x: 0, y: 0 };

const tailPositions: string[] = ['0,0'];

function moveUp(position: Position) {
    return {
        x: position.x,
        y: position.y + 1
    }
}
function moveRight(position: Position) {
    return {
        x: position.x + 1,
        y: position.y
    }
}
function moveDown(position: Position) {
    return {
        x: position.x,
        y: position.y - 1
    }
}
function moveLeft(position: Position) {
    return {
        x: position.x - 1,
        y: position.y
    }
}

function tailTouchingHead(): boolean {
    if (Math.abs(headPosition.x - tailPosition.x) <= 1 && Math.abs(headPosition.y - tailPosition.y) <= 1) {
        return true
    }
    return false
}

movements.forEach(movement => {
    for (let i = 0; i < movement.amount; i += 1) {
        // move head
        let newHeadPosition: null | Position = null;
        if (movement.direction === "U") newHeadPosition = moveUp(headPosition);
        if (movement.direction === "R") newHeadPosition = moveRight(headPosition);
        if (movement.direction === "D") newHeadPosition = moveDown(headPosition);
        if (movement.direction === "L") newHeadPosition = moveLeft(headPosition);
        // console.log(newHeadPosition)
        if (newHeadPosition) {
            headPosition = newHeadPosition;
        }
        let newTailPosition: null | Position = null;
        if (!tailTouchingHead()) {
            // move tail
            if(headPosition.x === tailPosition.x){
                // same row
                newTailPosition = {x: tailPosition.x, y: (headPosition.y + tailPosition.y)/2};
            }else if(headPosition.y === tailPosition.y){
                // same col
                newTailPosition = { x: (headPosition.x + tailPosition.x) / 2, y: tailPosition.y };
            }else{
                // diff row and col - move diag
                if(Math.abs(headPosition.x - tailPosition.x) === 1){
                    // move tail.x to head.x, move tail.y closer to head.y
                    newTailPosition = {x: headPosition.x, y: (headPosition.y + tailPosition.y)/2};
                }else{
                    // move tail.x closer to head.x, move tail.y to head.y
                    newTailPosition = { x: (headPosition.x + tailPosition.x) / 2, y: headPosition.y };
                }
            }
        }

        // add tail position
        if (newTailPosition) {
            tailPosition = newTailPosition;
            tailPositions.push(`${tailPosition.x},${tailPosition.y}`);
        }
    }
});

// console.log(movements);
console.log(tailPositions.uniq().length);

// console.log(tailPositions.uniq())
