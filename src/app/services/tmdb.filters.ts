interface TmdbFilters {
  SORT_OPTIONS: {label: string; value: string}[];
  GENRES: {label: string; value: number}[];
}

export const TMDB_FILTERS: TmdbFilters = {
  SORT_OPTIONS: [
      { label: 'Popularity DESC', value: 'popularity.desc' },
      { label: 'Popularity ASC', value: 'popularity.asc' }
  ],
  GENRES: [
    {label: 'Action', value: 28},
    {label: 'Adventure', value: 12},
    {label: 'Animation', value: 16},
    {label: 'Comedy', value: 35},
  ],
};
