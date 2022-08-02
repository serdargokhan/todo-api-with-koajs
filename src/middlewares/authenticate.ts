import {Context, Next} from 'koa';
// JWT
import jwt from 'jsonwebtoken';
// Environment Variables
import {env} from '@/config/environment';

export const authenticate = async (ctx: Context, next: Next) => {
    const jwtToken = ctx.get('Authorization');

    const accessToken = jwtToken.split(' ')[1];

    if (!accessToken) {
        ctx.body = {
            message: 'You have to specify Authorization header.'
        };
        return;
    }

    try {
        const token: any = jwt.verify(accessToken, env.ACCESS_TOKEN);
        ctx.user = token.username;
    } catch (err) {
        ctx.status = 403;
        ctx.body = {
            message: 'You are not authorized.'
        };
        return;
    }

    await next();
};
