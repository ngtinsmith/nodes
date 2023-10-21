/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js'],
            parser: '@typescript-eslint/parser',
        },
        {
            files: ['*.vue'],
            parser: 'vue-eslint-parser',
        },
    ],
};
