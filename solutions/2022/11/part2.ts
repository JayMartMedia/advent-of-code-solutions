/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../../utils/ts/src';
import input from './input';
setupUtils();

const monkeyInputs = input.split("\n\n");

interface Monkey {
    items: bigint[];
    inspectionCount: number;
    op(old: bigint): bigint;
    test(item: bigint): number;
}

const monkeys: Monkey[] = []

const clockFactors: number[] = [];

monkeyInputs.forEach(monkeyInput => {
    const lines = monkeyInput.splitLines();
    const items: bigint[] = lines[1].split(": ")[1].split(',').map(num => BigInt(num));
    const divisibleBy = lines[3].split('by ')[1].toNumThrows();
    clockFactors.push(divisibleBy);

    function op(old: bigint) {
        const operation = lines[2].split('=')[1].trim();
        const tokens = operation.split(' ');
        const bigIntTokens = tokens.map(token => {
            try{
                const tokenNum = token.toNumThrows();
                return `BigInt(${tokenNum})`;
            }catch(e){
                return token;
            }
        });
        const newOp = bigIntTokens.join(' ');
        //console.log(newOp)
        return eval(newOp);
    }

    function test(item: bigint) {
        const divisibleBy = lines[3].split('by ')[1].toNumThrows();
        const ifTrue = lines[4].split('monkey ')[1].toNumThrows();
        const ifFalse = lines[5].split('monkey ')[1].toNumThrows();
        if (item % BigInt(divisibleBy) === BigInt(0)) {
            return ifTrue;
        } else {
            return ifFalse;
        }
    }

    monkeys.push({
        inspectionCount: 0,
        items,
        op,
        test
    });
});

let clock = BigInt(1);
//console.log(clockFactors)
for(let cf of clockFactors){
    clock *= BigInt(cf);
}
//console.log(clock);
// console.log(monkeys);

// run rounds
for (let i = 0; i < 10000; i += 1) {
    //if(i%100 === 0) console.log(i);
    monkeys.forEach(monkey => {
        // run op on all items
        // since monkey did not damage item
        monkey.items = monkey.items.map(item => {
            monkey.inspectionCount += 1;
            const afterOp = monkey.op(item);
            return afterOp % clock;
        });
        // test items and throw to other monkey
        while (monkey.items.length > 0) {
            const item = monkey.items[0];
            const monkeyToGive = monkey.test(item);
            // give item
            monkeys[monkeyToGive].items.push(item);
            // remove from current inv
            monkey.items.splice(0, 1);
        }
    });
}

//console.log(monkeys);

const monkeyInspectionCounts = monkeys.map(monkey => monkey.inspectionCount);
const monkeyInspectionCountsSorted = monkeyInspectionCounts.sort((a, b) => b - a)
//console.log(monkeyInspectionCounts)
console.log(monkeyInspectionCountsSorted[0] * monkeyInspectionCountsSorted[1]);
