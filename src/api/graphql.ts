import { Character } from './types';

class GraphQL {
    private static RickAndMortyURL = 'https://rickandmortyapi.graphcdn.app/';

    public async getRandomCharacter (): Promise<Character> {
        let id = 0; 

        while (id === 0) { // To handle the rare case we get a 0 from the Math.random, let's go again.
            id = Math.round(Math.random() * 183);
        }
        
        return this.getCharacter(id);
    }

    public async getCharacter (id: number): Promise<Character> {
        const query = `query {
            character(id: ${id}) {
              id
              name
              status
              species
              gender
              image
              location {
                id
                name
                type
                dimension
              }
            }
          }
        `;

        const result = (await this.query(query)).character as Character;

        // The Rick and Morty API is returning numbers as strings in the GraphQL api for Ids.
        if (typeof result.id === 'string') {
            result.id = parseInt(result.id, 10);
        }
        if (typeof result.location.id === 'string') {
            result.location.id = parseInt(result.location.id, 10);
        }

        return result;
    }

    private async query (query: string): Promise<Record<string, any>> {
        try {
            const fetchResult = await fetch(GraphQL.RickAndMortyURL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({
                        query
                    }),
                });
            
                if (fetchResult.ok && fetchResult.status === 200) {
                    return (await fetchResult.json()).data;
                }

            throw new Error(`Status Text: ${fetchResult.statusText}, Status Code: ${fetchResult.status}`);
        } catch (e) {
            if (e instanceof Error) {
                console.error(`Error fetching character with id ${query}, message: ${e.message}`);
            } else {
                console.error(`Unknown error fetching character with id ${query}`);
            }
            throw e;
        }
    }
}

export const Api = new GraphQL();
