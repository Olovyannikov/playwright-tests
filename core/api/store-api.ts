import test, { APIRequestContext, APIResponse } from '@playwright/test';
import { APIClient } from '../../utils/types/api/client';
import { APIRoutes } from '../../utils/constants/routes';
import { Order } from '../../utils/types/api/types/order';

export class StoreApiClient implements APIClient {
    constructor(public context: APIRequestContext) {}

    async getOrderByIdAPI(orderId: number): Promise<APIResponse> {
        return await test.step(`Getting current order by "${orderId}"`, async () => {
            return await this.context.get(`${APIRoutes.STORE}/${orderId}`);
        });
    }

    async createOrderAPI(order: Order): Promise<APIResponse> {
        return await test.step(`Create order`, async () => {
            return await this.context.post(`${APIRoutes.STORE}}`, { data: order });
        });
    }

    async deleteOrderAPI(orderId: number): Promise<APIResponse> {
        return await test.step(`Delete current order by "${orderId}"`, async () => {
            return await this.context.delete(`${APIRoutes.STORE}/${orderId}`);
        });
    }
}
