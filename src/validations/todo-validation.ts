import {object, string, boolean} from 'yup';

export const todoSchema = object({
    todo: string().required().min(10),
    author: string().required().min(2),
    authorEmail: string().email().required(),
    completed: boolean().required()
}).camelCase();
