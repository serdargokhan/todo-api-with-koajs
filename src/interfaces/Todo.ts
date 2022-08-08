import {InferType} from 'yup';
// Yup Schema
import {todoPostSchema, todoPutSchema} from '@/validations/todo-validation';

export type PostTodo = InferType<typeof todoPostSchema>;
export type PutTodo = InferType<typeof todoPutSchema>;
