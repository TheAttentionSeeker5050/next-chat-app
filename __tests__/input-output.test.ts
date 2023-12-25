import "@testing-library/jest-dom";
import {describe, expect, test, it} from '@jest/globals';


// import our functions to test and validate
import { createUUID } from '@/utils/formatters/createUUID';
import { validateUUID } from '@/utils/validators/validateUUID';
import { validateAuthorName } from "@/utils/validators/validateAuthorName";



// describe the test suite -----------------------------
// test - create a uuid and validate correct format
describe('createUUID function test', () => {
    it('should create a uuid and validate correct format', () => {
        const uuid = createUUID();
        expect(validateUUID(uuid)).toBe(true);
    });

    it('should return invalid uuid', () => {
        expect(validateUUID('invalid uuid')).toBe(false);
    });
});

// test - validate author name
describe('validateAuthorName function test', () => {
    it('should return true for valid author name', () => {
        expect(validateAuthorName('validAuthorName')).toBe(true);
    });

    it('should return true for valid author name with numbers', () => {
        expect(validateAuthorName('validAuthorName123')).toBe(true);
    });

    it('should return false for empty author name', () => {
        expect(validateAuthorName('')).toBe(false);
    });

    it('should return false for author name with more than 35 characters', () => {
        expect(validateAuthorName('a'.repeat(36))).toBe(false);
    });

    it('should return false for author name with special characters', () => {
        expect(validateAuthorName('invalid author name!')).toBe(false);
    });

    it('should return false for author name with spaces', () => {
        expect(validateAuthorName('invalid author name')).toBe(false);
    });
});