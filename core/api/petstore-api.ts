import { expectStatusCode } from '@/utils/assertions/solutions';
import { APIRoutes } from '@/utils/constants/routes';
import { APIClient } from '@/utils/types/api/client';
import type { Pet } from '@/utils/types/api/types/pet';

import test, { APIRequestContext, APIResponse } from '@playwright/test';

export class PetstoreApiClient implements APIClient {
    constructor(public context: APIRequestContext) {}

    async getPetByIdAPI(petId: number): Promise<APIResponse> {
        return await test.step(`Getting current pet by "${petId}"`, async () => {
            return await this.context.get(`v2${APIRoutes.PET}/${petId}`);
        });
    }

    async createPetAPI(data: Pet): Promise<APIResponse> {
        return await test.step(`Create pet`, async () => {
            return await this.context.post(`v2${APIRoutes.PET}`, {
                data,
                headers: { 'Content-Type': 'application/json' },
            });
        });
    }

    async updatePetStatusAPI(pet: Partial<Pet>): Promise<APIResponse> {
        return await test.step(`Update status of current pet by id: "${pet.id}"`, async () => {
            return await this.context.put(`v2${APIRoutes.PET}`, { data: pet });
        });
    }

    async deletePetAPI(petId: number): Promise<APIResponse> {
        return await test.step(`Delete current pet by "${petId}"`, async () => {
            return await this.context.delete(`v2${APIRoutes.PET}/${petId}`);
        });
    }

    async getPetById(petId: number): Promise<Pet> {
        const response = await this.getPetByIdAPI(petId);
        await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
        return await response.json();
    }

    async createPet(data: Pet): Promise<Pet> {
        const response = await this.createPetAPI(data);

        await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
        return await response.json();
    }

    async updatePet(data: Partial<Pet>): Promise<Pet> {
        const response = await this.updatePetStatusAPI(data);

        await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
        return await response.json();
    }

    async deletePet(petId: number) {
        const response = await this.deletePetAPI(petId);

        await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
    }

    async checkDeletedPet(petId: number) {
        const response = await this.deletePetAPI(petId);

        await expectStatusCode({ actual: response.status(), expected: 404, api: response.url() });
    }

    async getNonExistedPet() {
        const response = await this.getPetByIdAPI(0);
        await expectStatusCode({ actual: response.status(), expected: 404, api: response.url() });
    }
}
