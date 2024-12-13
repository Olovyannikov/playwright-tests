import { Fixtures } from '@playwright/test';
import { PetstoreApiClient } from '../core/api/petstore-api';
import { Pet } from '../utils/types/api/types/pet';
import { getDefaultAPIContext } from '../core/context/default-context';

export type PetFixture = {
    petClient: PetstoreApiClient;
    pet: Pet;
};

export const petFixture: Fixtures<PetFixture> = {
    petClient: async (_, use) => {
        const context = await getDefaultAPIContext();
        const petClient = new PetstoreApiClient(context);

        await use(petClient);
    },
    pet: async ({ petClient }, use) => {
        const pet = await petClient.createPet({
            id: 12345,
            category: {
                id: 1,
                name: 'Dogs',
            },
            name: 'Rex',
            photoUrls: ['https://example.com/photo'],
            tags: [{ id: 1, name: 'tag1' }],
            status: 'available',
        });

        await use(pet);

        await petClient.deletePetAPI(pet.id);
    },
};
