export interface Movie {
    vote_count: number;
    id: number;
    video: boolean;
    vote_average: number;
    title: string;
    popularity: number;
    poster_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    backdrop_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
}

export interface MovieCast {
    character: string;
    credit_id: string;
    release_date: string;
    vote_count: number;
    video: false;
    adult: false;
    vote_average: number;
    title: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    overview: string;
    poster_path: string;
}

export interface FirestoreMovie {
    movieId: string;
    original_title: string;
    watched: boolean;
    poster_path: string;
    date: Date;
    userId: string;
}

