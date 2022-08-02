import {object, string} from 'yup';

export const authRegisterSchema = object({
    username: string().required(),
    email: string().email().required(),
    password: string().required().min(4).max(12)
}).camelCase();

export const authLoginSchema = object({
    username: string().required(),
    password: string().required().min(4).max(12)
}).camelCase();
