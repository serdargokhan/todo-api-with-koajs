// Types
import {Context, Next} from 'koa';
import {AnyObjectSchema} from 'yup';

export const validateRequests = (schema: AnyObjectSchema) => {
    return async (ctx: Context, next: Next) => {
        try {
            await schema.validate(ctx.request.body, {
                abortEarly: false,
                stripUnknown: true
            });
            await next();
        } catch (err) {
            ctx.status = 400;
            ctx.body = err;
        }
    };
};
