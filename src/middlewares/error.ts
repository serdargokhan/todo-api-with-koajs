// Types
import {Context, Next} from 'koa';

export const errorLogger = async (ctx: Context, next: Next) => {
    try {
        await next();
    } catch (err: any) {
        ctx.status = err.status || err.statusCode || 500;
        ctx.body = {
            message: err.message
        };
        console.error(err);
    }
};
