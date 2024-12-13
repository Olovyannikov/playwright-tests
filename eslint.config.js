import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';

import { fileURLToPath } from 'url';
import { resolve, dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config([
    js.configs.recommended,
    ...tseslint.configs.strict,
    {
        languageOptions: {
            parserOptions: {
                project: resolve(process.cwd(), 'tsconfig.json'),
                globals: {
                    ...globals.browser,
                    ...globals.node,
                    ...globals.es2020,
                },
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            prettier: prettierPlugin,
            'simple-import-sort': pluginSimpleImportSort,
        },
        files: ['**/*.{ts,tsx}'],
        rules: {
            ...prettierPlugin.configs.recommended.rules,
            ...eslintConfigPrettier.rules,
            'no-empty': 'warn',
            'no-else-return': 'warn',
            'no-nested-ternary': 'warn',
            'no-useless-computed-key': 'warn',
            'no-unsafe-optional-chaining': 'warn',
            'no-param-reassign': [
                'error',
                {
                    props: false,
                },
            ],
            'no-console': [
                'warn',
                {
                    allow: ['warn', 'error'],
                },
            ],
            'no-implicit-coercion': 'error',
            'prefer-const': 'error',
            'max-lines': ['warn', { max: 124 }],
            'max-params': ['error', 3],
            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        /* import 'foo*' or '@foo' */
                        ['^\\u0000@?\\w'],
                        /* import from '@/foo' */
                        ['^@/\\w'],
                        /* import .. from './foo' */
                        ['^\\.'],
                        /* import styles */
                        ['^.+\\.?(css)$'],
                    ],
                },
            ],
            '@typescript-eslint/no-invalid-void-type': 'off',
            '@typescript-eslint/no-namespace': 'warn',
        },
    },
    {
        ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
    },
]);