import test, { APIRequestContext, APIResponse } from '@playwright/test';
import { APIClient } from '../../utils/types/api/client';
import { APIRoutes } from '../../utils/constants/routes';
import { User } from '../../utils/types/api/types/user';

export class UserApiClient implements APIClient {
    constructor(public context: APIRequestContext) {}

    async getUserByIdAPI(userName: string): Promise<APIResponse> {
        return await test.step(`Getting current user by name: "${userName}"`, async () => {
            return await this.context.get(`${APIRoutes.USER}/${userName}`);
        });
    }

    async updateUserAPI(data: User): Promise<APIResponse> {
        return await test.step(`Update user`, async () => {
            return await this.context.put(`${APIRoutes.USER}}`, { data });
        });
    }

    async createUserAPI(data: User): Promise<APIResponse> {
        return await test.step(`Create order`, async () => {
            return await this.context.post(`${APIRoutes.USER}}`, { data });
        });
    }

    async deleteUserAPI(userName: string): Promise<APIResponse> {
        return await test.step(`Delete current user by name: "${userName}"`, async () => {
            return await this.context.delete(`${APIRoutes.USER}/${userName}`);
        });
    }
}
