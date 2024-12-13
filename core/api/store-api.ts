import { expectStatusCode } from '@/utils/assertions/solutions';
import { APIRoutes } from '@/utils/constants/routes';
import { APIClient } from '@/utils/types/api/client';
import type { Order } from '@/utils/types/api/types/order';

import test, { APIRequestContext, APIResponse } from '@playwright/test';

export class StoreApiClient implements APIClient {
    constructor(public context: APIRequestContext) {}

    async getOrderByIdAPI(orderId: number): Promise<APIResponse> {
        return await test.step(`Getting current order by "${orderId}"`, async () => {
            return await this.context.get(`v2${APIRoutes.STORE}/${orderId}`);
        });
    }

    async createOrderAPI(order: Partial<Order>): Promise<APIResponse> {
        return await test.step(`Create order`, async () => {
            return await this.context.post(`v2${APIRoutes.STORE}`, { data: order });
        });
    }

    async deleteOrderAPI(orderId: number): Promise<APIResponse> {
        return await test.step(`Delete current order by "${orderId}"`, async () => {
            return await this.context.delete(`v2${APIRoutes.STORE}/${orderId}`);
        });
    }

    async getOrderById(orderId: number): Promise<APIResponse> {
        const response = await this.getOrderByIdAPI(orderId);
        await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
        return await response.json();
    }

    async createOrder(order: Order): Promise<APIResponse> {
        const response = await this.createOrderAPI(order);
        await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
        return await response.json();
    }

    async createInvalidOrder(order: Partial<Order>) {
        const response = await this.createOrderAPI(order);
        await expectStatusCode({ actual: response.status(), expected: 500, api: response.url() });
    }

    async deleteOrder(order: number) {
        const response = await this.deleteOrderAPI(order);
        await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
    }

    async checkDeletedOrder(orderId: number) {
        const response = await this.deleteOrderAPI(orderId);
        await expectStatusCode({ actual: response.status(), expected: 404, api: response.url() });
    }

    async getNonExistedOrders() {
        const response = await this.getOrderByIdAPI(0);
        await expectStatusCode({ actual: response.status(), expected: 404, api: response.url() });
    }
}
