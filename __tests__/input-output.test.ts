import "@testing-library/jest-dom";
import {describe, expect, test, it} from '@jest/globals';


// import our functions to test and validate
import { createUUID } from '@/utils/formatters/createUUID';
import { validateUUID } from '@/utils/validators/validateUUID';



// describe the test suite
// test - create a uuid and validate correct format
describe('createUUID test', () => {
    it('should create a uuid and validate correct format', () => {
        const uuid = createUUID();
        expect(validateUUID(uuid)).toBe(true);
    });
});