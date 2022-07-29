import { ObjectId } from "mongodb";

export const getTodos = async (ctx) => {
    const todos = await ctx.mongo.db("koa-js").collection("todos").find({}).toArray();
    ctx.body = {
        status: "OK",
        todos
    }
}

export const createTodo = async (ctx) => {

    if (Array.isArray(ctx.request.body)) {
        const result = await ctx.mongo.db("koa-js").collection("todos").insertMany([...ctx.request.body]);

        return ctx.body = {
            status: "OK",
            message: `Successfully created ${result.insertedCount} todo(s).`
        }
    }

    const { todo, author } = ctx.request.body;

    if (!todo || !author) ctx.throw(400, "Please provide 'todo' and 'author' fields in your body correctly.");

    const result = await ctx.mongo.db("koa-js").collection("todos").insertOne({ todo, author, createdAt: new Date() });

    if (!result.insertedId) ctx.throw(500, "There is an issue with our database. Please try again.");

    ctx.status = 201;
    ctx.body = {
        status: "OK",
        message: `Todo is succesfully created with the following id ${result.insertedId}.`
    };
}

export const updateTodo = async (ctx) => {
    const { id } = ctx.params;

    const { todo } = ctx.request.body;

    if (!todo) ctx.throw(400, "Please provide 'todo' field in your body request.");

    const result = await ctx.mongo.db("koa-js").collection("todos").updateOne({ _id: ObjectId(id) }, [{ $set: { todo: todo } }]);

    if (result.acknowledged === false) ctx.throw(500, "There is an issue with our database. Please try again.");

    ctx.body = {
        status: "OK",
        message: `Found ${result.matchedCount} todo(s) in the database with the id of ${id}. ${result.modifiedCount} of your todo(s) has been modified.`
    }
}

export const deleteTodo = async (ctx) => {
    const { id } = ctx.params;

    const result = await ctx.mongo.db("koa-js").collection("todos").deleteOne({ _id: ObjectId(id) });

    if (result.acknowledged === false) ctx.throw(500, "There is an issue with our database. Please try again.");

    // TODO Undefined id if there is no deleted todo.
    ctx.body = {
        status: "OK",
        message: `Deleted ${result.deletedCount} todo(s) in the database with the id of ${id}`
    }
}
