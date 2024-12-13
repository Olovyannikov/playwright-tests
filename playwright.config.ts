import { defineConfig } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenvConfig({ path: resolve(__dirname, '.env'), override: true });

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    expect: {
        timeout: 5000,
    },
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html'], ['allure-playwright']],
    globalTeardown: resolve('./utils/config/global-teardown'),
    use: {
        actionTimeout: 0,
        trace: 'on-first-retry',
    },
});
