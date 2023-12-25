import "@testing-library/jest-dom";
import {describe, expect, test, it} from '@jest/globals';

// import our functions to test and validate
import { formatDate } from "@/utils/formatters/formatDate";

// describe the test suite -----------------------------
// test - format date
describe('formatDate function test', () => {
    it('should return empty string for invalid date', () => {
        expect(formatDate(new Date('invalid date'))).toBe('');
    });

    it('should return # seconds ago for date less than 2 minutes ago', () => {
        const date = new Date();
        date.setSeconds(date.getSeconds() - 10);
        expect(formatDate(date)).toBe('10 seconds ago');
    });

    it('should return # minutes ago for date less than 1 hour ago', () => {
        const date = new Date();
        date.setMinutes(date.getMinutes() - 10);
        expect(formatDate(date)).toBe('10 minutes ago');
    });

    it('should return HH:MM for date today', () => {
        const date = new Date();

        date.setTime(date.getTime() - 60*60*1000 - 1);

        const midnight = new Date();
        midnight.setHours(0,0,0,0);
        
        // this has to be conditional because the test will fail if the time is 12:00 AM
        if (date.getTime() < midnight.getTime()) {
            // console.log("format date on exception just after midnight: " + formatDate(date));
            // then it is in MM/DD format
            expect(formatDate(date)).toBe(date.toLocaleDateString([], {month: '2-digit', day: '2-digit'}));
        } else {
            
            // // print the date just to make sure it is correct
            // console.log(formatDate(date));

            expect(formatDate(date)).toBe(date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
        }
    });

    it('should return MM/DD for date this year', () => {
        const date = new Date();
        // substract a full day
        date.setTime(date.getTime() - 24*60*60*1000 - 1);

        const newYears = new Date();
        newYears.setMonth(0,1);
        newYears.setHours(0,0,0,0);

        // verify if the date is before new years
        if (date.getTime() < newYears.getTime()) {
            // console.log("format date on exception just before new years: " + formatDate(date));
            // then it is in MM/DD/YYYY format
            expect(formatDate(date)).toBe(date.toLocaleDateString());
        } else {
            // console.log("format date on this year: " + formatDate(date));
            // otherwise it is in MM/DD format
            expect(formatDate(date)).toBe(date.toLocaleDateString([], {month: '2-digit', day: '2-digit'}));
        }
    });

    it('should return MM/DD/YYYY for date last year', () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 2);
        expect(formatDate(date)).toBe(date.toLocaleDateString());
    });
});