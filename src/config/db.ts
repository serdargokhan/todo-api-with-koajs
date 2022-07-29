// Database
import { MongoClient } from "mongodb";
// Environment Variables
import { env } from "./environment";
// Types
import {Context, Next} from "koa"

const client = new MongoClient(`mongodb+srv://serdargokhan:${env.MONGO_PASSWORD}@todoapp.onamy.mongodb.net/?retryWrites=true&w=majority`);

client.connect(() => {
    console.log("Database connection is established.");
});

export const mongoConnection = async (ctx: Context, next: Next) => {
    ctx.mongo = client;
    await next();
}
