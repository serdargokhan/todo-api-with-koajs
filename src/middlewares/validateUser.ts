import {Context, Next} from 'koa';
import {ObjectId} from 'mongodb';

export const validateUser = async (ctx: Context, next: Next) => {
    const isMatchUser = await ctx.mongo
        .db('koa-js')
        .collection('todos')
        .findOne({_id: new ObjectId(ctx.params.todoId)});

    if (isMatchUser.author !== ctx.user) {
        ctx.status = 403;
        ctx.body = {
            message:
                'You are not authorized to change or delete this todo. You can only change or delete todos that belongs to you.'
        };
        return;
    }

    await next();
};
