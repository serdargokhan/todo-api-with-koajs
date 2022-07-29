// Database
import { MongoClient } from "mongodb";
// Environment Variables
import { env } from "./environment";

const client = new MongoClient(`mongodb+srv://serdargokhan:${env.MONGO_PASSWORD}@todoapp.onamy.mongodb.net/?retryWrites=true&w=majority`);

client.connect(() => {
    console.log("Database connection is established.");
});

export const mongoConnection = async (ctx, next) => {
    ctx.mongo = client;
    await next();
}
