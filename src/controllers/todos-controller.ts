import {ObjectId} from 'mongodb';
// Types
import {Context} from 'koa';
import {Todo} from '@/interfaces/Todo';

export const getTodos = async (ctx: Context) => {
    const todos = await ctx.mongo
        .db('koa-js')
        .collection('todos')
        .find({})
        .toArray();

    ctx.status = 200;
    ctx.body = {
        status: 'OK',
        todos
    };
};

export const createTodo = async (ctx: Context) => {
    const {todo, author, authorEmail, completed} = ctx.request.body as Todo;

    const result = await ctx.mongo.db('koa-js').collection('todos').insertOne({
        todo,
        author,
        authorEmail,
        completed,
        createdAt: new Date()
    });

    if (result.acknowledged === false)
        ctx.throw(
            500,
            'There is an issue with our database. Please try again later.'
        );

    ctx.status = 201;
    ctx.body = {
        status: 'OK',
        message: `Todo is succesfully created with the following id ${result.insertedId}.`
    };
};

export const updateTodo = async (ctx: Context) => {
    const {todoId} = ctx.params;

    const todoData = ctx.request.body as Todo;

    const updatedTodos = {
        ...todoData,
        updatedAt: new Date()
    };

    const result = await ctx.mongo
        .db('koa-js')
        .collection('todos')
        .updateOne({_id: new ObjectId(todoId)}, [{$set: updatedTodos}]);

    if (result.acknowledged === false) {
        ctx.throw(
            500,
            'There is an issue with our database. Please try again later.'
        );
    }

    if (result.matchedCount === 0) {
        return (ctx.body = {
            status: 'Not Found',
            message: `There is no todo with the id of ${todoId}`
        });
    }

    ctx.status = 201;
    ctx.body = {
        status: 'OK',
        message: `Found ${result.matchedCount} todo(s) in the database with the id of ${todoId}. ${result.modifiedCount} of your todo(s) has been modified.`
    };
};

export const deleteTodo = async (ctx: Context) => {
    const {todoId} = ctx.params;

    const result = await ctx.mongo
        .db('koa-js')
        .collection('todos')
        .deleteOne({_id: new ObjectId(todoId)});

    if (result.acknowledged === false) {
        ctx.throw(
            500,
            'There is an issue with our database. Please try again later.'
        );
    }

    if (result.deletedCount === 0) {
        return (ctx.body = {
            status: 'Not Found',
            message: `There is no todo with the id of ${todoId}`
        });
    }

    ctx.status = 204;
    ctx.body = {
        status: 'OK',
        message: `Deleted ${result.deletedCount} todo(s) in the database with the id of ${todoId}`
    };
};
