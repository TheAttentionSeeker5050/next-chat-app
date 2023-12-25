import { z } from 'zod';

export function validateAuthorName(authorName: string) {
    // this will return true if the authorName passes validation, can be safe string from 1 to 35 characters
    return z.string().min(1).max(35).safeParse(authorName).success;
}