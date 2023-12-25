import { z } from 'zod';

export function validateText(text: string) {
    // this will return true if the text passes validation, can be safe string from 1 to 600 characters
    return z.string().min(1).max(600).safeParse(text);
}