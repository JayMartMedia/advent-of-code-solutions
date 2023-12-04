declare global {
    interface Array<T> {
        max(this: Array<number>): number;
        min(this: Array<number>): number;
        sum(this: Array<number>): number;
        toNums(this: Array<string>): number[]; // throws if an element results in NaN
    }

    interface String {
        splitLines(): string[];
        toNum(): number; // throws if result is NaN
    }
}

export default function setupUtils(){
    // Array.prototype.max = function () {
    //     let max = null;
    //     for (const el of this) {
    //         if (el > max || max === null) {
    //             max = el;
    //         }
    //     }
    //     return max;
    // }

    Array.prototype.max = function () {
        return Math.max(...this);
    }

    // Array.prototype.min = function () {
    //     let min = null;
    //     for (const el of this) {
    //         if (el < min || min === null) {
    //             min = el;
    //         }
    //     }
    //     return min;
    // }

    Array.prototype.min = function () {
        return Math.min(...this);
    }

    Array.prototype.sum = function () {
        return this.reduce((sum, num) => {
            return sum + num;
        });
    }

    Array.prototype.toNums = function () {
        return this.map(e => e.toNum());
    }

    String.prototype.splitLines = function () {
        return this.split('\n');
    }

    String.prototype.toNum = function () {
        const num = Number(this);
        if (isNaN(num)) throw Error(`The provided string '${this}'cannot be converted to a number`);
        else return num;
    }
}
