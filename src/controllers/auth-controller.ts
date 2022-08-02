// Hashing
import {hash, compare} from 'bcrypt';
// JWT
import jwt from 'jsonwebtoken';
// Environment Variables
import {env} from '@/config/environment';
// Types
import {Context} from 'koa';
import {Auth} from '@/interfaces/index';

export const registerUser = async (ctx: Context) => {
    const {username, email, password} = ctx.request.body as Auth;

    const hashedPassword = await hash(password, 10);

    const result = await ctx.mongo.db('koa-js').collection('users').insertOne({
        username,
        email,
        password: hashedPassword
    });

    ctx.body = {
        status: 'OK',
        message: `User has been created successfully with the id of ${result.insertedId}`
    };
};

export const loginUser = async (ctx: Context) => {
    const {username, password} = ctx.request.body;

    const result = await ctx.mongo
        .db('koa-js')
        .collection('users')
        .findOne({username: username});

    if (!result) {
        ctx.status = 401;
        ctx.body = {
            message: `There is no user found with the username ${username}`
        };
        return;
    }

    const isCredentialsCorrect = await compare(password, result.password);

    if (!isCredentialsCorrect) {
        ctx.status = 401;
        ctx.body = {
            message: 'Your password is incorrect.'
        };
        return;
    }

    const accessToken = jwt.sign(
        {username: username, email: result.email},
        env.ACCESS_TOKEN,
        {
            expiresIn: '15m'
        }
    );

    ctx.body = {
        status: 'OK',
        message: `Welcome ${result.username}`,
        accessToken
    };
};
