/**
 * Run with `npx ts-node-dev --respawn ./part1.ts`
 */
import setupUtils from '../../utils/ts/src';
import input from './input';
setupUtils();

const monkeyInputs = input.split("\n\n");

interface Monkey {
    items: number[];
    inspectionCount: number;
    op(old: number): number;
    test(item: number): number;
}

const monkeys: Monkey[] = []

monkeyInputs.forEach(monkeyInput => {
    const lines = monkeyInput.splitLines();
    const items: number[] = lines[1].split(": ")[1].split(',').toNumsThrows();

    function op (old: number) {
        const operation = lines[2].split('=')[1];
        return eval(operation);
    }

    function test (item: number) {
        const divisibleBy = lines[3].split('by ')[1].toNumThrows();
        const ifTrue = lines[4].split('monkey ')[1].toNumThrows();
        const ifFalse = lines[5].split('monkey ')[1].toNumThrows();
        if (item % divisibleBy === 0){
            return ifTrue;
        }else{
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

// console.log(monkeys);

// run rounds
for(let i = 0; i < 20; i += 1){
    monkeys.forEach(monkey => {
        // run op on all items, then divide by three and round down
        // since monkey did not damage item
        monkey.items = monkey.items.map(item => {
            monkey.inspectionCount+=1;
            return Math.floor(monkey.op(item)/3);
        });
        // test items and throw to other monkey
        while(monkey.items.length > 0) {
            const item = monkey.items[0];
            const monkeyToGive = monkey.test(item);
            // give item
            monkeys[monkeyToGive].items.push(item);
            // remove from current inv
            monkey.items.splice(0,1);
        }
    });
}

// console.log(monkeys);

const monkeyInspectionCounts = monkeys.map(monkey => monkey.inspectionCount).sort((a,b) => b-a);

console.log(monkeyInspectionCounts[0]*monkeyInspectionCounts[1])
