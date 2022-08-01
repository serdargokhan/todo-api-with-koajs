import {InferType} from 'yup';
// Yup Schema
import {todoSchema} from '@/validations/todo-validation';

export type Todo = InferType<typeof todoSchema>;
