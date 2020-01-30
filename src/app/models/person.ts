export interface Person {
    profile_path: string;
    adult: boolean;
    id: number;
    known_for: any[];
    name: string;
    popularity: number;
}

export interface PersonDetails {
    adult: boolean;
    also_known_as: {
        name: string
    };
    known_for_departments: string;
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepge: string;
    id: number;
    imdb_id: string;
    name: string;
    place_of_birth: string;
    popularity: string;
    profile_path: string;
}
