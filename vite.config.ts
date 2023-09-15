import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), svgLoader()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use "src/styles/_helpers.scss" as *;
                    @use "src/styles/_colors.scss" as *;
                `,
            },
        },
    },
});
