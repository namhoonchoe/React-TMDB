import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '@redux/store';

const searchSlice = createSlice({
  name:"search",
  initialState:{
    search: {
      routeTrigger:"",
      searchQuery:""
    }
  },
  reducers:{
    getSearchTerm: (state,action) => {
      state.search.routeTrigger = action.payload
      state.search.searchQuery = action.payload
    },
    resetRouteTrigger:(state,action) => {
      state.search.routeTrigger = action.payload
    }
  }
})

export const { getSearchTerm, resetRouteTrigger } = searchSlice.actions;

export const selectSearch = (state:RootState) => state.search.search

export default searchSlice.reducer