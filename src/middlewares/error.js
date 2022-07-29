export const errorLogger = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = 500;
        console.error(err);
    }
}