import { UserApiClient } from '@/core/api/user-api';
import { getDefaultAPIContext } from '@/core/context/default-context';

import test, { expect } from '@playwright/test';

test.describe('User', async () => {
    test('Get User By Id', async () => {
        const context = await getDefaultAPIContext();
        const userApiClient = new UserApiClient(context);
        await userApiClient.getUserById('john_doe_junior');
    });

    test('Create User', async () => {
        const context = await getDefaultAPIContext();
        const userApiClient = new UserApiClient(context);

        await userApiClient.createUser({
            id: 12000,
            username: 'john_doe_junior',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password123',
            phone: '123456789',
            userStatus: 1,
        });
    });

    test('Update User', async () => {
        const context = await getDefaultAPIContext();
        const userApiClient = new UserApiClient(context);

        await userApiClient.updateUser({
            id: 12000,
            username: 'john_doe_junior',
            firstName: 'Johnny',
            lastName: 'Doe',
            email: 'john_doe@example.com',
            password: 'password123',
            phone: '123456789',
            userStatus: 1,
        });
    });

    test('Delete User', async () => {
        const context = await getDefaultAPIContext();
        const userApiClient = new UserApiClient(context);
        await userApiClient.deleteUser('john_doe_junior');
        await userApiClient.checkDeletedUser('john_doe_junior');
    });

    test('User not found', async () => {
        const context = await getDefaultAPIContext();
        const userApiClient = new UserApiClient(context);
        await userApiClient.getNonExistedUsers();
    });
});
