import { Api } from '../../src/api';

const GoldenRick = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    location: {
        id: 3,
        name: "Citadel of Ricks",
        type: "Space station",
        dimension: "unknown"
    }
};

describe('Api', () => {
    it('Can fetch Rick', async () => {
        const rick = await Api.getCharacter(1);
        expect(rick).toEqual(GoldenRick);
    });

    it('Can fetch a Random Character', async () => {
        const random = await Api.getRandomCharacter();
        expect(random).toBeDefined;
        expect(random.id).toBeGreaterThanOrEqual(0);
        expect(random.id).toBeLessThanOrEqual(183);
        expect(random.location).toBeDefined;
    })
});