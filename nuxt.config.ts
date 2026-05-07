// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    css: ['~/assets/css/base.css', '~/styles/_colors.scss'],
    devtools: { enabled: true },
    modules: ['@pinia/nuxt', 'nuxt-svgo', '@nuxt/eslint'],
    svgo: {
        autoImportPath: false,
        defaultImport: 'component',
    },
    experimental: {
        // Temporary warning fix, remove in future versions
        // https://github.com/nuxt/nuxt/issues/34812
        serverAppConfig: false,
    },
    components: [
        // Override SVGO (default: svgo) prefix using Nuxt's components config
        // directly (bypass autoImportPath) and let nuxt-svgo only handle the
        // vite transform
        { path: '~/assets/icons', extensions: ['svg'], prefix: '' },
        '~/components',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "~/styles/_helpers.scss" as *;
                    `,
                },
            },
        },
    },
});

