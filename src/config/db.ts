// Database
import {MongoClient} from 'mongodb';
// Environment Variables
import {env} from './environment';
// Types
import {Context, Next} from 'koa';

const client = new MongoClient(env.MONGO_URI ?? 'mongodb://127.0.0.1:27017');

client.connect(() => {
    console.log('Database connection is established.');
});

export const mongoConnection = async (ctx: Context, next: Next) => {
    ctx.mongo = client;
    await next();
};
