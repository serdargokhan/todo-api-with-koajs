import {object, string, boolean} from 'yup';

export const todoPostSchema = object({
    todo: string().required().min(10),
    completed: boolean().required()
}).camelCase();

export const todoPutSchema = object({
    todo: string().optional().min(10),
    completed: boolean().required()
}).camelCase();
