import { expectStatusCode } from '@/utils/assertions/solutions';
import { APIRoutes } from '@/utils/constants/routes';
import { APIClient } from '@/utils/types/api/client';
import type { User } from '@/utils/types/api/types/user';

import test, { APIRequestContext, APIResponse } from '@playwright/test';

export class UserApiClient implements APIClient {
    constructor(public context: APIRequestContext) {}

    async getUserByIdAPI(userName: string): Promise<APIResponse> {
        return await test.step(`Getting current user by name: "${userName}"`, async () => {
            return await this.context.get(`v2${APIRoutes.USER}/${userName}`);
        });
    }

    async updateUserAPI(data: User): Promise<APIResponse> {
        return await test.step(`Update user`, async () => {
            return await this.context.put(`v2${APIRoutes.USER}/${data.username}`, { data });
        });
    }

    async createUserAPI(data: User): Promise<APIResponse> {
        return await test.step(`Create User`, async () => {
            return await this.context.post(`v2${APIRoutes.USER}`, { data });
        });
    }

    async deleteUserAPI(userName: string): Promise<APIResponse> {
        return await test.step(`Delete current user by name: "${userName}"`, async () => {
            return await this.context.delete(`v2${APIRoutes.USER}/${userName}`);
        });
    }

    async getUserById(userName: string): Promise<APIResponse> {
        const response = await this.getUserByIdAPI(userName);
        await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
        return response.json();
    }

    async createUser(User: User): Promise<User> {
        const response = await this.createUserAPI(User);
        await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
        return await response.json();
    }

    async updateUser(User: User): Promise<User> {
        const response = await this.updateUserAPI(User);
        await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
        return await response.json();
    }

    async deleteUser(user: string) {
        const response = await this.deleteUserAPI(user);
        await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
    }

    async checkDeletedUser(userId: string) {
        const response = await this.deleteUserAPI(userId);
        await expectStatusCode({ actual: response.status(), expected: 404, api: response.url() });
    }

    async getNonExistedUsers() {
        const response = await this.getUserByIdAPI('unknownUser');
        await expectStatusCode({ actual: response.status(), expected: 404, api: response.url() });
    }
}
