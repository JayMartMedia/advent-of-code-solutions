declare global {
    interface String {
        /**
         * Splits a string into lines on the '\n' character
         * @returns an array of strings
         */
        splitLines(): string[];
        /**
         * Returns the number value of the string, or NaN if the number cannot be cleanly converted
         * @returns number or NaN
         */
        toNum(): number;
        /**
         * Returns the number value of the string, or throws if string cannot be converted cleanly
         * @returns number
         * @throws if the string cannot be cleanly converted to a number (i.e. result in NaN)
         */
        toNumThrows(): number;
        /**
         * Divide a string into n arrays
         * 
         * @example
         *   'testing1' // given
         *   if (numSections === 2) => ['test','ing1']
         *   if (numSections === 3) => Throws error
         *   if (numSections === 4) => ['te','st','in','g1']
         */
        divide(numSections: number): string[];
        /**
         * @experimental
         * Returns the ascii code for the first char in string, may return an array in the future
         */
        ascii(): number;
    }
}

export default function setupStringExtensionUtils(){
    String.prototype.splitLines = function () {
        return this.split('\n');
    }

    String.prototype.toNum = function () {
        return Number(this);
    }

    String.prototype.toNumThrows = function () {
        const num = Number(this);
        if (isNaN(num)) throw Error(`The provided string '${this}' cannot be converted to a number`);
        else return num;
    }

    String.prototype.divide = function(numSections: number): string[] {
        const sections: string[] = [];
        if(this.length % numSections !== 0) throw Error(`This array with ${this.length} items cannot be cleanly divided into ${numSections} sections`);
        const sectionSize = this.length/numSections;
        for(let i = 0; i < this.length; i += 1) {
            const section = sections[Math.floor(i/sectionSize)];
            if(!section) {
                sections.push('');
            }
            sections[Math.floor(i/sectionSize)] += this[i];
        }
        return sections;
    }

    String.prototype.ascii = function(): number {
        if (this.length > 1) console.warn(`Warning: Only returning ascii code for first character of string: '${this}'`);
        return this.charCodeAt(0);
    }
}