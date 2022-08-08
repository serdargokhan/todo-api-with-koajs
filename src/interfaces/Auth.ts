import {InferType} from 'yup';
// Yup Schema
import {
    authRegisterSchema,
    authLoginSchema
} from '@/validations/auth-validation';

export type RegisterAuth = InferType<typeof authRegisterSchema>;
export type LoginAuth = InferType<typeof authLoginSchema>;
