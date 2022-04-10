import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";

interface IDiscoverGenre {
  info: IGenre;
  type: string;
}

interface IDiscoverInfo {
  discoverList: Array<IMovieData> & Array<ISeriesData>;
  discoverGenres: Array<IGenre>;
}

interface IDiscoverQuery {
  sort: string | undefined;
  genreInclude: string | undefined;
  genreExclude: string | undefined;
  page: number;
}

type genreFilters = Array<IDiscoverGenre>;

interface ITriggerPayload {
  sort: string | undefined;
  genreInclude: string | undefined;
  genreExclude: string | undefined;
}

interface IState {
  discoverInfo: IDiscoverInfo;
  discoverQuery: IDiscoverQuery;
  genreFilters: genreFilters;
  triggered: boolean;
}

const discoverState: IState = {
  discoverInfo: { discoverList: [], discoverGenres: [] },

  discoverQuery: {
    sort: undefined,
    genreInclude: undefined,
    genreExclude: undefined,
    page: 1,
  },

  genreFilters: [],

  triggered: false,
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

    updateFilter: (state: IState, action: PayloadAction<IDiscoverGenre>) => {
      const target = state.genreFilters;
      const filterUpdated= [...target, action.payload];
      return {
        ...state,
        genreFilters: filterUpdated,
      };
    },


    setDiscoverQuery: (
      state: IState,
      action: PayloadAction<ITriggerPayload>
    ) => {
      const target = state.discoverQuery;
      const triggerPayload = action.payload;
      const renewedQuery = { ...target, ...triggerPayload };
      return { ...state, discoverQuery: renewedQuery };
    },

    nextPage: (state: IState) => {
      const nextPage = state.discoverQuery.page + 1;
      const getNext = { ...state.discoverQuery, page: nextPage };
      return { ...state, discoverQuery: getNext };
    },

    prevPage:(state: IState) => {
      const nextPage = state.discoverQuery.page - 1;
      const getNext = { ...state.discoverQuery, page: nextPage };
      return { ...state, discoverQuery: getNext };
    },

    triggerRender: (state: IState) => {
      return { ...state, triggered: true };
    },

    resetTrigger: (state: IState) => {
      return { ...state, triggered: false };
    },
  },
});

export const {
  getInfos,
  updateFilter,
  setDiscoverQuery,
  nextPage,
  prevPage,
  resetFilter,
  resetQuery,
  resetTrigger,
  triggerRender,
} = discoverSlice.actions;


export const selectDiscover = (state: RootState) => state.discover;
export const selectGenreFilter = (state: RootState) => state.discover.genreFilters
export default discoverSlice.reducer;
