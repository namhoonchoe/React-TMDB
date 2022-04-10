import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: "en-US",
  },
});

export const movieApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upComing: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: (id: number) => api.get(`movie/${id}`),
  similar: (id: number) => api.get(`/movie/${id}/similar`),
  credits: (id: number) => api.get(`/movie/${id}/credits`),
  movieSearch: (term: string) =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  tvDetail: (id: number) => api.get(`tv/${id}`),
  similar: (id: number) => api.get(`/tv/${id}/similar`),
  credits: (id: number) => api.get(`/tv/${id}/credits`),

  tvSearch: (term: string) =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

export const personApi = {
  popular: (page?: number) =>
    api.get("person/popular", {
      params: {
        page: page,
      },
    }),
  peopleDetail: (id: number) =>
    api.get(`person/${id}`, {
      params: {
        append_to_response: "images",
      },
    }),
  movieCredits: (id: number) => api.get(`person/${id}/movie_credits`),
  seriesCredits: (id: number) => api.get(`person/${id}/tv_credits`),
  alsoKnownAs: (id: number) => api.get(`person/${id}/translations`),
};

export const trendingApi = {
  trending: (type: string) => api.get(`trending/${type}/week`),
};

export const discoverApi = {
  discoverMovie: (
    sort?: string,
    genreInclude?: string,
    genreExclude?: string,
    page?: number
  ) =>
    api.get("discover/movie", {
      params: {
        sort_by: sort,
        with_genres: genreInclude,
        without_genres: genreExclude,
        page: page,
      },
    }),
  discoverSeries: (
    sort?: string,
    genreInclude?: string,
    genreExclude?: string,
    page?: number
  ) =>
    api.get("discover/tv", {
      params: {
        sort_by: sort,
        with_genres: genreInclude,
        without_genres: genreExclude,
        page: page,
      },
    }),
};

export const genreApi = {
  movieGenres: () => api.get("genre/movie/list"),
  seriesGenres: () => api.get("genre/tv/list"),
};
