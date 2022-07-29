import dotenv from "dotenv";
// Init dotenv
dotenv.config();

export const env = {
    PORT: process.env.PORT,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD
}