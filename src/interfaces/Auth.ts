import {InferType} from 'yup';
// Yup Schema
import {authSchema} from '@/validations/auth-validation';

export type Auth = InferType<typeof authSchema>;
