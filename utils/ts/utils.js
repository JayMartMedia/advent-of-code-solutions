"use strict";
exports.__esModule = true;
function setupUtils() {
    Array.prototype.max2 = function () {
        var max = null;
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var el = _a[_i];
            if (max === null || el > max) {
                max = el;
            }
        }
        return max;
    };
    Array.prototype.max = function () {
        return Math.max.apply(Math, this);
    };
    Array.prototype.min2 = function () {
        var min = null;
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var el = _a[_i];
            if (min === null || el < min) {
                min = el;
            }
        }
        return min;
    };
    Array.prototype.min = function () {
        return Math.min.apply(Math, this);
    };
    Array.prototype.sum = function () {
        return this.reduce(function (sum, num) {
            return sum + num;
        });
    };
    Array.prototype.toNums = function () {
        return this.map(function (e) { return e.toNum(); });
    };
    Array.prototype.toNumsThrows = function () {
        return this.map(function (e) { return e.toNumThrows(); });
    };
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
    Array.prototype.divide = function (numSections) {
        if (this.length % numSections !== 0)
            throw Error("This array with ".concat(this.length, " items cannot be cleanly divided into ").concat(numSections, " sections"));
        var sectionSize = this.length / numSections;
        var sections = [];
        for (var i = 0; i < this.length; i += 1) {
            var section = sections[Math.floor(i / sectionSize)];
            if (!section) {
                sections.push([]);
            }
            sections[Math.floor(i / sectionSize)].push(this[i]);
        }
        return sections;
    };
    Array.prototype.uniq = function () {
        var set = new Set(this);
        return Array.from(set);
    };
    String.prototype.splitLines = function () {
        return this.split('\n');
    };
    String.prototype.toNum = function () {
        return Number(this);
    };
    String.prototype.toNumThrows = function () {
        var num = Number(this);
        if (isNaN(num))
            throw Error("The provided string '".concat(this, "' cannot be converted to a number"));
        else
            return num;
    };
    String.prototype.divide = function (numSections) {
        var sections = [];
        if (this.length % numSections !== 0)
            throw Error("This array with ".concat(this.length, " items cannot be cleanly divided into ").concat(numSections, " sections"));
        var sectionSize = this.length / numSections;
        for (var i = 0; i < this.length; i += 1) {
            var section = sections[Math.floor(i / sectionSize)];
            if (!section) {
                sections.push('');
            }
            sections[Math.floor(i / sectionSize)] += this[i];
        }
        return sections;
    };
    String.prototype.ascii = function () {
        if (this.length > 1)
            console.warn("Warning: Only returning ascii code for first character of string: '".concat(this, "'"));
        return this.charCodeAt(0);
    };
}
exports["default"] = setupUtils;
