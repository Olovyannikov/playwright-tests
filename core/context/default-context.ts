import { request } from '@playwright/test';

export const getDefaultAPIContext = async () => {
    return await request.newContext({
        baseURL: 'https://petstore.swagger.io/',
    });
};
