import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
    redirection: "",
  },
  reducers: {
    getSearchTerm: (state, action) => {
      state.redirection = action.payload;
      state.searchQuery = action.payload;
    },
    resetRedirection: (state) => {
      state.redirection = "";
    },
  },
});

export const { getSearchTerm, resetRedirection } = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;
export default searchSlice.reducer;
