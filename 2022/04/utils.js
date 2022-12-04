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

    Array.prototype.total = function () {
        return this.reduce((sum, num) => {
            return sum + num;
        });
    }

    String.prototype.splitLines = function () {
        return this.split('\n');
    }
}
