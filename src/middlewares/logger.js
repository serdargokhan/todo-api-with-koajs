export const timeLogger = async (ctx, next) => {
    const now = new Date().toUTCString();
    console.log(`This request is made at ${now}`);
    await next();
};
