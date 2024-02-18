import { z } from 'zod';

export function validateEmail(email: string) {
    // this will return true if the email passes validation, can be safe string from 1 to 100 characters
    return z.string().email().safeParse(email);
}