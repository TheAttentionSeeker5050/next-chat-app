import {z} from 'zod';

// validate password with zod with custom message
export function validatePassword(password: string) {
    // this will return true if the password passes validation, can be safe string from 8 to 100 characters
    // has to contain one uppercase letter, one lowercase letter, one number, and one special character
    return z.string().min(8).max(100).refine((password) => {
        // contains at least one uppercase letter
        return /[A-Z]/.test(password);
    }, {
        message: 'Password must contain at least one uppercase letter'
    }).refine((password) => {
        // contains at least one lowercase letter
        return /[a-z]/.test(password);
    }, {
        message: 'Password must contain at least one lowercase letter'
    }).refine((password) => {
        // contains at least one number
        return /[0-9]/.test(password);
    }, {
        message: 'Password must contain at least one number'
    }).refine((password) => {
        // contains at least one special character of the following: -$*#$%@!&
        return /[-$*#$%@!&]/.test(password);
    }, {
        message: 'Password must contain at least one special character'
    }).safeParse(password);
};
