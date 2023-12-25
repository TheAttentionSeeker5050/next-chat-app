import { z } from 'zod';

export function validateAuthorName(authorName: string) {
    // this will return true if the authorName passes validation, can be safe string from 1 to 35 characters, no special characters, only letters and numbers, no spaces
    return z.string().min(1).max(35).regex(/^[a-zA-Z0-9]+$/).safeParse(authorName);
}