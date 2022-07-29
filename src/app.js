import Koa from "koa";
import KoaLogger from "koa-logger";
import KoaBodyParser from "koa-bodyparser";
import KoaCors from "@koa/cors";
import KoaHelmet from "koa-helmet";
// Routes
import todosRouter from "./routes/todos";
// Middlewares
import { errorLogger, timeLogger } from "./middlewares/index";
// Database
import { mongoConnection } from "./config/db";
// Environment Variables
import { env } from "./config/environment";

const app = new Koa();
const PORT = env.PORT || 3000;

// Init Koa Middlewares
app.use(KoaLogger());
app.use(KoaCors());
app.use(KoaBodyParser());
app.use(KoaHelmet());
// Init Custom Middlewares
app.use(errorLogger);
app.use(timeLogger);
app.use(mongoConnection);

// Init routes
app.use(todosRouter.routes()).use(todosRouter.allowedMethods());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});