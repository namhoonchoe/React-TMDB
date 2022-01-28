import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";

interface IGenre {
  info: any;
  type: string;
}

interface IDiscoverInfo {
  discoverList: any;
  discoverGenres: any;
}

interface IDiscoverQuery {
  sort: string | undefined;
  genreInclude: string | undefined;
  genreExclude: string | undefined;
  page: number;
}

type genreFilters = Array<IGenre>;

interface ITriggerPayload {
  sort: string | undefined;
  genreInclude: string | undefined;
  genreExclude: string | undefined;
}

interface IState {
  discoverInfo: IDiscoverInfo;
  discoverQuery: IDiscoverQuery;
  genreFilters: genreFilters;
}

const discoverState: IState = {
  discoverInfo: { discoverList: null, discoverGenres: null },

  discoverQuery: {
    sort: undefined,
    genreInclude: undefined,
    genreExclude: undefined,
    page: 1,
  },

  genreFilters: [],
};

const discoverSlice = createSlice({
  name: "discover",
  initialState: discoverState,
  reducers: {
    getInfos: (state: IState, action: PayloadAction<any>) => {
      const infos = action.payload;
      return {
        ...state,
        discoverInfo: infos,
      };
    },

    resetFilter: (state: IState) => {
      return {
        ...state,
        genreFilters: [],
      };
    },

    resetQuery: (state: IState) => {
      const target = state.discoverQuery;
      const reset = {
        ...target,
        sort: undefined,
        genreInclude: undefined,
        genreExclude: undefined,
        page: 1,
      };
      return {
        ...state,
        discoverQuery: reset,
      };
    },

    addToFilter: (state: IState, action: PayloadAction<IGenre>) => {
      const target = state.genreFilters;
      const filterAdded = [...target, action.payload];
      return {
        ...state,
        genreFilters: filterAdded,
      };
    },

    removeFromFilter: (state: IState, action: PayloadAction<IGenre>) => {
      const target = state.genreFilters;
      const filterRemoved = target.filter(
        (genreFilter) => genreFilter.info.id !== action.payload.info.id
      );
      return {
        ...state,
        genreFilters: filterRemoved,
      };
    },

    discoverTrigger: (
      state: IState,
      action: PayloadAction<ITriggerPayload>
    ) => {
      const target = state.discoverQuery;
      const triggerPayload = action.payload;
      const renewedQuery = { ...target, ...triggerPayload };
      return { ...state, discoverQuery: renewedQuery };
    },

    fetchMore: (state: IState) => {
      const nextPage = state.discoverQuery.page + 1;
      const getNext = { ...state.discoverQuery, page: nextPage };
      return { ...state, discoverQuery: getNext };
    },
  },
});

export const {
  getInfos,
  addToFilter,
  removeFromFilter,
  discoverTrigger,
  fetchMore,
  resetFilter,
  resetQuery,
} = discoverSlice.actions;

export const selectDiscoverInfoList = (state: RootState) =>
  state.discover.discoverInfo.discoverList;
export const selectDiscoverInfoGenres = (state: RootState) =>
  state.discover.discoverInfo.discoverGenres;

export const selectGenreFilters = (state: RootState) =>
  state.discover.genreFilters;
export const selectExcludeFilter = (state: RootState) =>
  state.discover.genreFilters.filter((filter) => filter.type === "exclude");
export const selectIncludeFilter = (state: RootState) =>
  state.discover.genreFilters.filter((filter) => filter.type === "include");

export const selectExcludeId = (state: RootState) =>
  state.discover.genreFilters
    .filter((filter) => filter.type === "exclude")
    .map((genre) => genre.info["id"]);
export const selectIncludeId = (state: RootState) =>
  state.discover.genreFilters
    .filter((filter) => filter.type === "include")
    .map((genre) => genre.info["id"]);

export const selectDiscoverQuery = (state: RootState) =>
  state.discover.discoverQuery;

export default discoverSlice.reducer;
