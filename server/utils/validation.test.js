const expect = require('expect');
const {isRealString} = require('./validation');

describe("isRealString", () => {
    it('should reject no string values', () => {
        expect(isRealString(1)).toBe(false);
    });

    it('should reject string with only spaces', () => {
        expect(isRealString("   ")).toBe(false);
    });

    it('should allow non-space character', () => {
        expect(isRealString("a")).toBe(true);
    });
});