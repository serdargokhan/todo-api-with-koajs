// Types
import {Context, Next} from 'koa';

export const errorLogger = async (ctx: Context, next: Next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = 500;
        console.error(err);
    }
};
