import { expectToEqual } from '../solutions';
import { Pet } from '../../types/api/types/pet';

type AssertPetProps = {
    expectedPet: Pet;
    actualPet: Pet;
};

type AssertUpdatePetProps = {
    expectedPet: Pet;
    actualPet: Pet;
};

export const assertUpdatePet = async ({ expectedPet, actualPet }: AssertUpdatePetProps) => {
    await expectToEqual({
        actual: expectedPet.status,
        expected: actualPet.status,
        description: `Update Pet ${actualPet.id} :: ${actualPet.name} :: ${actualPet.status}`,
    });
};

export const assertPet = async ({ expectedPet, actualPet }: AssertPetProps) => {
    await expectToEqual({ actual: expectedPet.id, expected: actualPet.id, description: 'Pet "id"' });
    await assertUpdatePet({ expectedPet, actualPet });
};
