"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function range(start, end, step = 1) {
    // Test that the first 3 arguments are finite numbers.
    // Using Array.prototype.every() and Number.isFinite().
    const allNumbers = [start, end, step].every(Number.isFinite);
    // Throw an error if any of the first 3 arguments is not a finite number.
    if (!allNumbers) {
        throw new TypeError('range() expects only finite numbers as arguments.');
    }
    // Ensure the step is always a positive number.
    if (step <= 0) {
        throw new Error('step must be a number greater than 0.');
    }
    // When the start number is greater than the end number,
    // modify the step for decrementing instead of incrementing.
    if (start > end) {
        step = -step;
    }
    // Determine the length of the array to be returned.
    // The length is incremented by 1 after Math.floor().
    // This ensures that the end number is listed if it falls within the range.
    const length = Math.floor(Math.abs((end - start) / step)) + 1;
    // Fill up a new array with the range numbers
    // using Array.from() with a mapping function.
    // Finally, return the new array.
    return Array.from(Array(length), (x, index) => start + index * step);
}
exports.default = range;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvcmFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUF3QixLQUFLLENBQUMsS0FBYSxFQUFFLEdBQVcsRUFBRSxJQUFJLEdBQUcsQ0FBQztJQUNoRSxzREFBc0Q7SUFDdEQsdURBQXVEO0lBQ3ZELE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTdELHlFQUF5RTtJQUN6RSxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO0tBQzFFO0lBRUQsK0NBQStDO0lBQy9DLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRTtRQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztLQUMxRDtJQUVELHdEQUF3RDtJQUN4RCw0REFBNEQ7SUFDNUQsSUFBSSxLQUFLLEdBQUcsR0FBRyxFQUFFO1FBQ2YsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDO0tBQ2Q7SUFFRCxvREFBb0Q7SUFDcEQscURBQXFEO0lBQ3JELDJFQUEyRTtJQUMzRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFOUQsNkNBQTZDO0lBQzdDLDhDQUE4QztJQUM5QyxpQ0FBaUM7SUFDakMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDdkUsQ0FBQztBQTlCRCx3QkE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5nZShzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgc3RlcCA9IDEpIHtcbiAgLy8gVGVzdCB0aGF0IHRoZSBmaXJzdCAzIGFyZ3VtZW50cyBhcmUgZmluaXRlIG51bWJlcnMuXG4gIC8vIFVzaW5nIEFycmF5LnByb3RvdHlwZS5ldmVyeSgpIGFuZCBOdW1iZXIuaXNGaW5pdGUoKS5cbiAgY29uc3QgYWxsTnVtYmVycyA9IFtzdGFydCwgZW5kLCBzdGVwXS5ldmVyeShOdW1iZXIuaXNGaW5pdGUpO1xuXG4gIC8vIFRocm93IGFuIGVycm9yIGlmIGFueSBvZiB0aGUgZmlyc3QgMyBhcmd1bWVudHMgaXMgbm90IGEgZmluaXRlIG51bWJlci5cbiAgaWYgKCFhbGxOdW1iZXJzKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncmFuZ2UoKSBleHBlY3RzIG9ubHkgZmluaXRlIG51bWJlcnMgYXMgYXJndW1lbnRzLicpO1xuICB9XG5cbiAgLy8gRW5zdXJlIHRoZSBzdGVwIGlzIGFsd2F5cyBhIHBvc2l0aXZlIG51bWJlci5cbiAgaWYgKHN0ZXAgPD0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc3RlcCBtdXN0IGJlIGEgbnVtYmVyIGdyZWF0ZXIgdGhhbiAwLicpO1xuICB9XG5cbiAgLy8gV2hlbiB0aGUgc3RhcnQgbnVtYmVyIGlzIGdyZWF0ZXIgdGhhbiB0aGUgZW5kIG51bWJlcixcbiAgLy8gbW9kaWZ5IHRoZSBzdGVwIGZvciBkZWNyZW1lbnRpbmcgaW5zdGVhZCBvZiBpbmNyZW1lbnRpbmcuXG4gIGlmIChzdGFydCA+IGVuZCkge1xuICAgIHN0ZXAgPSAtc3RlcDtcbiAgfVxuXG4gIC8vIERldGVybWluZSB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheSB0byBiZSByZXR1cm5lZC5cbiAgLy8gVGhlIGxlbmd0aCBpcyBpbmNyZW1lbnRlZCBieSAxIGFmdGVyIE1hdGguZmxvb3IoKS5cbiAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIGVuZCBudW1iZXIgaXMgbGlzdGVkIGlmIGl0IGZhbGxzIHdpdGhpbiB0aGUgcmFuZ2UuXG4gIGNvbnN0IGxlbmd0aCA9IE1hdGguZmxvb3IoTWF0aC5hYnMoKGVuZCAtIHN0YXJ0KSAvIHN0ZXApKSArIDE7XG5cbiAgLy8gRmlsbCB1cCBhIG5ldyBhcnJheSB3aXRoIHRoZSByYW5nZSBudW1iZXJzXG4gIC8vIHVzaW5nIEFycmF5LmZyb20oKSB3aXRoIGEgbWFwcGluZyBmdW5jdGlvbi5cbiAgLy8gRmluYWxseSwgcmV0dXJuIHRoZSBuZXcgYXJyYXkuXG4gIHJldHVybiBBcnJheS5mcm9tKEFycmF5KGxlbmd0aCksICh4LCBpbmRleCkgPT4gc3RhcnQgKyBpbmRleCAqIHN0ZXApO1xufVxuIl19