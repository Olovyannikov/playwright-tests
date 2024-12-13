import { Fixtures } from '@playwright/test';

export const combineFixtures = (...args: Fixtures[]) => {
    return args.reduce((acc, fixture) => ({ ...acc, ...fixture }), {});
};
