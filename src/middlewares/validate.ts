// Types
import {Context, Next} from 'koa';
// Validation
import {todoSchema} from '@/validations/todo-validation';

export const validate = async (ctx: Context, next: Next) => {
    try {
        await todoSchema.validate(ctx.request.body, {
            abortEarly: false,
            stripUnknown: true
        });
        await next();
    } catch (err) {
        ctx.status = 400;
        ctx.body = err;
    }
};
