/*
query {
  character(id: 1) {
    id
    name
    status
    species
    gender
    image
    location {
      name
      type
      dimension
    }
  }
}
*/

export type Url = string;

export interface Entity {
    id: number;
    name: string;
}

export interface Location extends Entity{
    type: string;
    dimension: string;
}

export interface Character extends Entity {
    status: string;
    species: string;
    gender: string;
    location: Location;
    image: Url;
}
