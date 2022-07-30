// Types
import {Context, Next} from 'koa';

export const timeLogger = async (ctx: Context, next: Next) => {
    const now = new Date().toUTCString();
    console.log(`This request is made at ${now}`);
    await next();
};
