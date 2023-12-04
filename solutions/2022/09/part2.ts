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

let knotPositions: Position[] = [{ x: 0, y: 0 },{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];

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

function followerTouchingLeader(leader: Position, follower: Position): boolean {
    if (Math.abs(leader.x - follower.x) <= 1 && Math.abs(leader.y - follower.y) <= 1) {
        return true
    }
    return false
}

movements.forEach(movement => {
    for (let i = 0; i < movement.amount; i += 1) {
        // move first knot
        let newHeadPosition: null | Position = null;
        if (movement.direction === "U") newHeadPosition = moveUp(knotPositions[0]);
        if (movement.direction === "R") newHeadPosition = moveRight(knotPositions[0]);
        if (movement.direction === "D") newHeadPosition = moveDown(knotPositions[0]);
        if (movement.direction === "L") newHeadPosition = moveLeft(knotPositions[0]);
        if (newHeadPosition) {
            knotPositions[0] = newHeadPosition;
        }
        // move following knots
        for(let j = 1; j < knotPositions.length; j+=1){
            if (!followerTouchingLeader(knotPositions[j-1], knotPositions[j])) {
                // move tail
                if (knotPositions[j-1].x === knotPositions[j].x) {
                    // same row
                    knotPositions[j] = { x: knotPositions[j].x, y: (knotPositions[j-1].y + knotPositions[j].y) / 2 };
                } else if (knotPositions[j-1].y === knotPositions[j].y) {
                    // same col
                    knotPositions[j] = { x: (knotPositions[j-1].x + knotPositions[j].x) / 2, y: knotPositions[j].y };
                } else {
                    // diff row and col - move diag
                    if (Math.abs(knotPositions[j-1].x - knotPositions[j].x) === 1) {
                        knotPositions[j] = { x: knotPositions[j-1].x, y: (knotPositions[j-1].y + knotPositions[j].y) / 2 };
                    } else if (Math.abs(knotPositions[j-1].y-knotPositions[j].y) === 1){
                        knotPositions[j] = { x: (knotPositions[j-1].x + knotPositions[j].x) / 2, y: knotPositions[j-1].y };
                    } else {
                        knotPositions[j] = { x: (knotPositions[j - 1].x + knotPositions[j].x) / 2, y: (knotPositions[j - 1].y + knotPositions[j].y) / 2 };
                    }
                }
            }

            if(j === knotPositions.length-1){
                tailPositions.push(`${knotPositions[j].x},${knotPositions[j].y}`);
            }
        }
    }
});

console.log(tailPositions.uniq().length);
