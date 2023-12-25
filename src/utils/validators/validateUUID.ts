import { z } from 'zod';

export function validateUUID(uuid: string) {
    // this will return true if the uuid passes validation, can be safe string from 1 to 36 characters
    return z.string().uuid().safeParse(uuid).success;
}