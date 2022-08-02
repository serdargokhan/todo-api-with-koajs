import {object, string, boolean} from 'yup';

export const todoSchema = object({
    todo: string().required().min(10),
    authorEmail: string().email().required(),
    completed: boolean().required()
}).camelCase();
