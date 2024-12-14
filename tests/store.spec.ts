import { StoreApiClient } from '@/core/api/store-api';
import { getDefaultAPIContext } from '@/core/context/default-context';
import type { Order } from '@/utils/types/api/types/order';

import test, { expect } from '@playwright/test';

test.describe('Store', async () => {
    test('Get Order By Id', async () => {
        const context = await getDefaultAPIContext();
        const storeApiClient = new StoreApiClient(context);
        await storeApiClient.getOrderById(2);
    });

    test('Create Order', async () => {
        const context = await getDefaultAPIContext();
        const storeApiClient = new StoreApiClient(context);

        const newOrder = await storeApiClient.createOrder({
            id: 1,
            petId: 12345,
            quantity: 1,
            shipDate: '2024-09-30T13:00:00.000Z',
            status: 'placed',
            complete: false,
        });

        expect(newOrder.status).toEqual('placed');
    });

    test('Invalid Order', async () => {
        const context = await getDefaultAPIContext();
        const storeApiClient = new StoreApiClient(context);

        await storeApiClient.createInvalidOrder({
            id: 'invalid_id',
            petId: 'invalid_petId',
            quantity: -1,
            status: 'unknown',
        } as unknown as Order);
    });

    test('Delete Order', async () => {
        const context = await getDefaultAPIContext();
        const storeApiClient = new StoreApiClient(context);
        await storeApiClient.deleteOrder(1);
        await storeApiClient.checkDeletedOrder(1);
    });

    test('Order not found', async () => {
        const context = await getDefaultAPIContext();
        const storeApiClient = new StoreApiClient(context);
        await storeApiClient.getNonExistedOrders();
    });
});
