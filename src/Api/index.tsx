import axios , { AxiosInstance } from "axios";

const api:AxiosInstance = axios.create({
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
  movieDetail: (id:number) => api.get(`movie/${id}`),
  similar: (id:number) => api.get(`/movie/${id}/similar`),
  credits: (id:number) => api.get(`/movie/${id}/credits`),
  movieSearch: (term:string) =>
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
  tvDetail: (id:number) => api.get(`tv/${id}`),
  similar: (id:number) => api.get(`/tv/${id}/similar`),
  credits: (id:number) => api.get(`/tv/${id}/credits`),

  tvSearch: (term:string) =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

export const personApi = {
  popular: () => api.get("person/popular"),
  peopleDetail: (id:number) =>
    api.get(`person/${id}`, {
      params: {
        append_to_response: "images",
      },
    }),
  credits: (id:number) => api.get(`person/${id}/movie_credits`),
};

export const trendingApi = {
  trending: (type:string) => api.get(`trending/${type}/day`),
};
