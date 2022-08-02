import {object, string} from 'yup';

export const authSchema = object({
    username: string().required(),
    email: string().email().required(),
    password: string().required().min(4).max(12)
}).camelCase();
