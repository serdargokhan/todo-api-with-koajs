import {defineConfig} from 'tsup';

export default defineConfig(options => {
    return {
        entry: ['src/app.ts'],
        target: 'esnext',
        format: ['esm'],
        splitting: false,
        sourcemap: !!options.watch,
        dts: false,
        clean: true,
        treeshake: true,
        minify: !options.watch
    };
});
