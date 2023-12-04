/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../../utils/ts/src';
import input from './input';
setupUtils();

const pairLines = input.split('\n\n');

type Arr = number | number[] | Arr[];

const pairs: Arr[][] = pairLines.map(pairLine => pairLine.splitLines().map(l => JSON.parse(l)));

/**
 * -2 === There has been an error, this should not be possible
 * -1 === Right is lower (incorrect order)
 *  0 === Values are equal (continue comparing)
 *  1 === Left is lower (correct order)
 * @returns 
 */

function compare(left: Arr, right: Arr): number {
    //console.log('comparing', left, ' to ', right)
    // if both values are integers
    if (typeof left === 'number' && typeof right === 'number') {
        //console.log('nums');
        if (left < right) {
            return 1
        } else if (left > right) {
            return -1;
        } else if (left === right) {
            return 0;
        } else {
            console.log('impossible to be here 1');
            return -2
        }
    }

    // if both values are lists
    // @ts-ignore
    if (Array.isArray(left) && Array.isArray(right)) {
        // compare each item in list
        for (let i = 0; i < left.length; i += 1) {
            // if right list runs out of items first, inputs are not in correct order
            if (right[i] === undefined) {
                //console.log('no items left in right');
                return -1;
            }

            const res = compare(left[i], right[i]);
            if (res !== 0) {
                return res;
            } else {
                //console.log('equal lists');
            }
        }

        // if left list runs out, inputs are in correct order
        if (right.length > left.length) {
            return 1;
        }

        // otherwise lists are equal
        return 0;
    }

    // if exactly one value is an integer
    if (typeof left !== typeof right) {
        // convert the integer to a list and retry the comparison
        // @ts-ignore
        if (Array.isArray(left)) {
            return compare(left, [right]);
            // @ts-ignore
        } else if (Array.isArray(right)) {
            return compare([left], right);
        } else {
            console.log('impossible to get to 2');
        }
    }
    console.log(typeof left, typeof right)
    console.log('impossible to get to 3');
    return -2;
}

// console.log(compare([1,1,3,1,1], [1,1,5,1,1]), 1)
// console.log(compare([[1],[2,3,4]], [[1],4]), 1)
// console.log(compare([9], [[8,7,6]]), -1)
// console.log(compare([[4,4],4,4], [[4,4],4,4,4]), 1) //
// console.log(compare([7,7,7,7], [7,7,7]), -1)
// console.log(compare([], [3]), 1) //
// console.log(compare([[[]]], [[]]), -1)
// console.log(compare([1,[2,[3,[4,[5,6,7]]]],8,9], [1,[2,[3,[4,[5,6,0]]]],8,9]), -1)

const correctOrderIdxs: number[] = [];
for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i];
    const res = compare(pair[0], pair[1]);
    console.log(res);
    if (res === 1) {
        correctOrderIdxs.push(i + 1);
    }
}
console.log(correctOrderIdxs)
console.log(correctOrderIdxs.sum());

// pairs.forEach(pair => {
//     if(JSON.stringify(pair[0]) === JSON.stringify(pair[1])){
//         console.log('equal');
//     }
// });

console.log('done');

// attempted guesses
//   - 5348