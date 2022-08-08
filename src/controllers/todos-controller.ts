import {ObjectId} from 'mongodb';
// Types
import {Context} from 'koa';
import {PostTodo, PutTodo} from '@/interfaces/Todo';

export const getTodo = async (ctx: Context) => {
    const {todoId} = ctx.params;

    const todoItem = await ctx.mongo
        .db('koa-js')
        .collection('todos')
        .findOne({_id: new ObjectId(todoId)});

    if (!todoItem) {
        ctx.status = 204;
        return;
    }

    ctx.status = 200;
    ctx.body = {
        status: 'OK',
        todoItem
    };
};

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
    const {todo, completed} = ctx.request.body as PostTodo;

    const result = await ctx.mongo.db('koa-js').collection('todos').insertOne({
        todo,
        author: ctx.user,
        authorEmail: ctx.email,
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

    const todoData = ctx.request.body as PutTodo;

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
        ctx.body = {
            status: 'Not Found',
            message: `There is no todo with the id of ${todoId}`
        };
        return;
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
        ctx.body = {
            status: 'Not Found',
            message: `There is no todo with the id of ${todoId}`
        };
        return;
    }

    ctx.body = {
        status: 'OK',
        message: `Deleted ${result.deletedCount} todo(s) in the database with the id of ${todoId}`
    };
};
