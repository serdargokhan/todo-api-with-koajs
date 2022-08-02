import dotenv from 'dotenv';
// Init dotenv
dotenv.config();

export const env = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN!
};
