import setupArrayExtensionMethods from "../src/arrayMethods";
import setupStringExtensionUtils from "../src/stringMethods";

describe('Array method extensions', () => {
    beforeAll(() => {
        setupArrayExtensionMethods();
        setupStringExtensionUtils();
    });
    describe('The Array.max method', () => {
        it('finds the max value in an array with a single item', () => {
            const arr = [4];
            const expectedMax = 4;
            expect(arr.max()).toBe(expectedMax);
        });
        it('finds the max value in an array with multiple items', () => {
            const arr = [1,3,9,2,1];
            const expectedMax = 9;
            expect(arr.max()).toBe(expectedMax);
        });
        it('finds the max value in an array with max value of 0', () => {
            const arr = [-4,-3, 0,-2,-9];
            const expectedMax = 0;
            expect(arr.max()).toBe(expectedMax);
        })
        it('finds the max value in an array with some negative values', () => {
            const arr = [1,-3,7,2,-2];
            const expectedMax = 7;
            expect(arr.max()).toBe(expectedMax);
        });
        it('finds the max value in an array with all negative values', () => {
            const arr = [-4,-3,-7,-2,-9];
            const expectedMax = -2;
            expect(arr.max()).toBe(expectedMax);
        });
    });
    describe('The Array.min method', () => {
        it('finds the min value in an array with a single item', () => {
            const arr = [4];
            const expectedMin = 4;
            expect(arr.min()).toBe(expectedMin);
        });
        it('finds the min value in an array with multiple items', () => {
            const arr = [1,3,9,2,1];
            const expectedMin = 1;
            expect(arr.min()).toBe(expectedMin);
        });
        it('finds the min value in an array with min value of 0', () => {
            const arr = [1,0,9,2,1];
            const expectedMin = 0;
            expect(arr.min()).toBe(expectedMin);
        });
        it('finds the min value in an array with some negative values', () => {
            const arr = [1,-3,7,2,-2];
            const expectedMin = -3;
            expect(arr.min()).toBe(expectedMin);
        });
        it('finds the min value in an array with all negative values', () => {
            const arr = [-4,-3,-7,-2,-9];
            const expectedMin = -9;
            expect(arr.min()).toBe(expectedMin);
        });
    });
    describe('The Array.sum method', () => {
        it('finds the sum of values of an array with a single item', () => {
            const arr = [4];
            const expectedSum = 4;
            expect(arr.sum()).toBe(expectedSum);
        });
        it('finds the sum of values of an array with multiple items', () => {
            const arr = [1,3,9,2,1];
            const expectedSum = 16;
            expect(arr.sum()).toBe(expectedSum);
        });
        it('finds the sum of values of an array that contains 0', () => {
            const arr = [1,0,9,2,1];
            const expectedSum = 13;
            expect(arr.sum()).toBe(expectedSum);
        });
        it('finds the sum of values of an array with some negative values', () => {
            const arr = [1,-3,7,2,-2];
            const expectedSum = 5;
            expect(arr.sum()).toBe(expectedSum);
        });
        it('finds the sum of values of an array with all negative values', () => {
            const arr = [-4,-3,-7,-2,-9];
            const expectedSum = -25;
            expect(arr.sum()).toBe(expectedSum);
        });
    });
    describe('The Array.toNums method', () => {
        it('converts an array of strings to an array of numbers', () => {
            const arr = ['4', '9'];
            const expectedConvertedArr = [4, 9];
            expect(arr.toNums()).toEqual(expectedConvertedArr);
        });
        it('converts an array of strings to an array of numbers when there is a negative number', () => {
            const arr = ['4', '-2'];
            const expectedConvertedArr = [4,-2];
            expect(arr.toNums()).toEqual(expectedConvertedArr);
        });
        it('converts an array of strings to an array of numbers when there is 0', () => {
            const arr = ['4', '0'];
            const expectedConvertedArr = [4,0];
            expect(arr.toNums()).toEqual(expectedConvertedArr);
        });
        it('converts an array of strings to an array of numbers and strings that cannot be converted are NaN', () => {
            const arr = ['4', 'not num'];
            const expectedConvertedArr = [4,NaN];
            expect(arr.toNums()).toEqual(expectedConvertedArr);
        });
    });
    describe('The Array.toNumsThrows method', () => {
        it('converts an array of strings to an array of numbers', () => {
            const arr = ['4', '9'];
            const expectedConvertedArr = [4, 9];
            expect(arr.toNumsThrows()).toEqual(expectedConvertedArr);
        });
        it('converts an array of strings to an array of numbers and strings that cannot be converted throw error', () => {
            const arr = ['4', 'not num'];
            expect(() => arr.toNumsThrows()).toThrow();
        });
    });
    describe('The Array.last method', () => {
        it('returns the last item from an array with a single item', () => {
            const arr = [9];
            const expectedLastItem = 9;
            expect(arr.last()).toBe(expectedLastItem);
        });
        it('returns the last item from an array with multiple items', () => {
            const arr = [9,4,5,11];
            const expectedLastItem = 11;
            expect(arr.last()).toBe(expectedLastItem);
        });
        it('returns the last item from an array with multiple items of multiple types', () => {
            const arr = [9,4,5,'ex string', 11, 'other'];
            const expectedLastItem = 'other';
            expect(arr.last()).toBe(expectedLastItem);
        });
    });
    describe('The Array.divide method', () => {
        // TODO: add tests for this method
    });
    describe('The Array.uniq method', () => {
        // TODO: Figure out if using sets will cause this test to some times fail
        //       due to non-guaranteed order
        it('returns an array of all the unique items in the array', () => {
            const arr = [1,2,2,9,8,2,9];
            const expectedUniqArr = [1,2,9,8];
            expect(arr.uniq()).toEqual(expectedUniqArr);
        });
        it('returns an array of all the unique items in an array with different primitive types', () => {
            const arr = [1,2,'string',9,8,2,9];
            const expectedUniqArr = [1,2,'string',9,8];
            expect(arr.uniq()).toEqual(expectedUniqArr);
        });
    });
})
