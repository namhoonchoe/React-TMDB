interface IMovieData {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface IMovieDetail {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | object;
  budget: number;
  genres: Array<IGenre>;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: Array<ICompany>;
  production_countries: Array<ICountry>;
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: Array<ILanguage>;
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IMovieDetailCasting  {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface IMovieDetailCrew {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

interface IMovieDetailCredit {
  id: number;
  cast: Array<IMovieDetailCasting>;
  crew: Array<IMovieDetailCrew>;
}

interface IMovieSimilar {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface ISeriesData {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: Array<string>;
  genre_ids: Array<number>;
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

interface ISearchMovies {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface ISearchSeries {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: Array<string>;
  genre_ids: Array<number>;
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

interface ISeriesDetail {
  backdrop_path: string | null;
  created_by: Array<ICreator>;
  episode_run_time: Array<number>;
  first_air_date: string;
  genres: Array<IGenre>;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: Array<string>;
  last_air_date: string;
  last_episode_to_air: ILastEpisode;
  name: string;
  next_episode_to_air: null;
  networks: Array<INetwork>;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: Array<IProduction>;
  production_countries: Array<ICountry>;
  seasons: Array<ISeason>;
  spoken_languages: Array<ISpokenLanguage>;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

interface ISeriesDetailCasting {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
}

interface ISeriesDetailCrew {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

interface ISeriesDetailCredit {
  id: number;
  cast: Array<ISeriesDetailCasting>;
  crew: Array<ISeriesDetailCrew>;
}

interface ISeriesSimilar {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: Array<string>;
  genre_ids: Array<number>;
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

interface IPersonData {
  profile_path: string;
  adult: boolean;
  id: number;
  name: string;
  popularity: number;
}

interface IPersonDetail {
  birthday: string | null;
  known_for_department: string;
  deathday: null | string;
  id: number;
  name: string;
  also_known_as: Array<string>;
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: string;
  homepage: null | string;
}

interface IMovieCast {
  character: string;
  credit_id: string;
  release_date: string;
  vote_count: number;
  video: boolean;
  adult: boolean;
  vote_average: number;
  title: string;
  genre_ids: Array<number>;
  original_language: string;
  original_title: string;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  overview: string;
  poster_path: string | null;
}

interface ISeriesCast {
  credit_id: string;
  original_name: string;
  id: number;
  genre_ids: Array<number>;
  character: string;
  name: string;
  poster_path: string | null;
  vote_count: number;
  vote_average: number;
  popularity: number;
  episode_count: number;
  original_language: string;
  first_air_date: string;
  backdrop_path: string | null;
  overview: string;
  origin_country: Array<string>;
}

interface IMovieCrew {
  id: number;
  department: string;
  original_language: string;
  original_title: string;
  job: string;
  overview: string;
  vote_count: number;
  video: boolean;
  poster_path: string | null;
  backdrop_path: string | null;
  title: string;
  popularity: number;
  genre_ids: Array<number>;
  vote_average: number;
  adult: boolean;
  release_date: string;
  credit_id: string;
}

interface ISeriesCrew {
  id: number;
  department: string;
  original_language: string;
  episode_count: number;
  job: string;
  overview: string;
  origin_country: Array<string>;
  original_name: string;
  genre_ids: Array<number>;
  name: string;
  first_air_date: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  vote_average: number;
  poster_path: string | null;
  credit_id: string;
}

interface IMovieCreditInfo {
  cast: Array<IMovieCast>;
  crew: Array<IMovieCrew>;
  id: number;
}

interface ISeriesCreditInfo {
  cast: Array<ISeriesCast>;
  crew: Array<ISeriesCrew>;
  id: number;
}

interface IGenre {
  id: number;
  name: string;
}

interface ICountry {
  iso_3166_1: string;
  name: string;
}

interface ICompany {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

interface ILanguage {
  iso_639_1: string;
  name: string;
}

interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface ICreator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

interface INetwork {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

interface IProduction {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

interface ISeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

interface ILastEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

type DetailInfo = IMovieDetail & ISeriesDetail
type CreditInfo = IMovieDetailCredit & ISeriesDetailCredit

