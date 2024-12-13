import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export const createAllureEnvironmentFile = (): void => {
    const reportFolder = resolve(process.cwd(), 'allure-results');
    const environmentContent = Object.entries(process.env).reduce(
        (previousValue, [variableName, value]) => `${previousValue}\n${variableName}=${value}`,
        ''
    );

    mkdirSync(reportFolder, { recursive: true });
    writeFileSync(`${reportFolder}/environment.properties`, environmentContent, 'utf-8');
};
