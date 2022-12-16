declare global {
    interface Array<T> {
        /**
         * Returns the number with the highest value from the array of numbers
         * @param this an array of numbers
         * @returns the number with the highest value from the array
         */
        max(this: Array<number>): number;
        /**
         * @experimental Returns the highest item in the array (may work funky due to string/object comparison)
         * @param this an array
         * @returns the highest item in the array
         */
        max2(this: Array<T>): T;
        /**
         * Returns the number with the lowest value from the array of numbers
         * @param this an array of numbers
         * @returns the number with the lowest value from the array
         */
        min(this: Array<number>): number;
        /**
         * @experimental Returns the lowest item in the array (may work funky due to string/object comparison)
         * @param this an array
         * @returns the lowest item in the array
         */
        min2(this: Array<T>): T;
        /**
         * Calculates and returns the sum of all numbers in the array of numbers
         * @param this an array of numbers
         * @returns the sum of all numbers in the array
         */
        sum(this: Array<number>): number;
        /**
         * Returns the last item in the array
         * @param this an array
         * @returns the last item in the array
         */
        last(): any;
        /**
         * Maps over all the strings in the array and converts them to a number or NaN
         * (Does not mutate)
         * @param this an array of strings
         * @returns an array of numbers and NaN
         */
        toNums(this: Array<string>): number[];
        /**
         * Maps over all the strings in the array and converts them to a number or throws if string cannot be converted cleanly
         * (Does not mutate)
         * @param this an array of strings
         * @returns an array of numbers
         * @throws if the array contains strings which cannot be cleanly converted to a number (i.e. result in NaN)
         */
        toNumsThrows(this: Array<string>): number[];
        /**
         * Divides an array into n arrays
         * (Does not mutate)
         * 
         * @example 
         *   [1,2,3,4,5,6] // given
         *   if (numSections === 2) => [[1,2,3],[4,5,6]]
         *   if (numSections === 3) => [[1,2],[3,4],[5,6]]
         *   if (numSections === 5) => Throws error
         * 
         * @param this an array
         * @param numSections the number of sections that the array should be divided into
         * @returns an array of arrays
         */
        divide(this: Array<any>, numSections: number): any[][];
        /**
         * Returns an array of all the unique items in the array
         * @returns an array of all the unique items in the array
         */
        uniq(): any[];
    }
}

export default function setupArrayExtensionMethods(){
    Array.prototype.max2 = function () {
        let max = null;
        for (const el of this) {
            if (max === null || el > max) {
                max = el;
            }
        }
        return max;
    }

    Array.prototype.max = function () {
        return Math.max(...this);
    }

    Array.prototype.min2 = function () {
        let min = null;
        for (const el of this) {
            if (min === null || el < min) {
                min = el;
            }
        }
        return min;
    }

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

    Array.prototype.toNumsThrows = function () {
        return this.map(e => e.toNumThrows());
    }

    Array.prototype.last = function () {
        return this[this.length-1];
    }

    Array.prototype.divide = function (numSections: number): any[][] {
        if(this.length % numSections !== 0) throw Error(`This array with ${this.length} items cannot be cleanly divided into ${numSections} sections`);
        const sectionSize = this.length/numSections;
        const sections: any[][] = [];
        for(let i = 0; i < this.length; i += 1) {
            const section = sections[Math.floor(i/sectionSize)];
            if(!section) {
                sections.push([]);
            }
            sections[Math.floor(i/sectionSize)].push(this[i]);
        }
        return sections;
    }

    Array.prototype.uniq = function (): any[] {
        const set = new Set(this);
        return Array.from(set);
    }
}