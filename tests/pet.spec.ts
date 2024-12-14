import { PetstoreApiClient } from '@/core/api/petstore-api';
import { getDefaultAPIContext } from '@/core/context/default-context';

import test, { expect } from '@playwright/test';

test.describe('Pet', async () => {
    test('Get Pet By Id', async () => {
        const context = await getDefaultAPIContext();
        const petClient = new PetstoreApiClient(context);
        await petClient.getPetById(12);
    });

    test('Create Pet', async () => {
        const context = await getDefaultAPIContext();
        const petClient = new PetstoreApiClient(context);

        const newPet = await petClient.createPet({
            id: 121416,
            category: { id: 1, name: 'Dogs' },
            name: 'Vzux',
            photoUrls: ['https://example.com/photo'],
            tags: [{ id: 1, name: 'tag1' }],
            status: 'available',
        });

        expect(newPet.name).toEqual('Vzux');
    });

    test('Update Pet', async () => {
        const context = await getDefaultAPIContext();
        const petClient = new PetstoreApiClient(context);

        const newPet = await petClient.updatePet({
            id: 121416,
            category: { id: 1, name: 'Dogs' },
            name: 'Vzux',
            photoUrls: ['https://example.com/photo'],
            tags: [{ id: 1, name: 'tag1' }],
            status: 'sold',
        });

        expect(newPet.status).toEqual('sold');
    });

    test('Delete Pet', async () => {
        const context = await getDefaultAPIContext();
        const petClient = new PetstoreApiClient(context);
        await petClient.deletePet(121416);
        await petClient.checkDeletedPet(121416);
    });

    test('Pet not found', async () => {
        const context = await getDefaultAPIContext();
        const petClient = new PetstoreApiClient(context);
        await petClient.getNonExistedPet();
    });
});
