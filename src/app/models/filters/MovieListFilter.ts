export class MovieListFilter {

    public paginationMaxSize: number = 10;
    public paginationItemsPerPage: number = 20;

    constructor(public page: number,
                public language: string,
                public total_results: number = null,
                public sort_by: string = null,
                public primary_release_year: number = null,
                public with_genres: number = null) {

    }

    setFilterValue(filter, value, defaultValue) {

        if (filter === 'page' || filter === 'language') {
            return;
        }

        if (value === defaultValue) {
            value = null;
        }

        this[filter] = value;
    }
}
