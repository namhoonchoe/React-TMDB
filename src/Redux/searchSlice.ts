import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '@redux/store';

const searchSlice = createSlice({
  name:"search",
  initialState:{
      routeTrigger:"",
      searchQuery:""
  },
  reducers:{
    getSearchTerm: (state,action) => {
      state.routeTrigger = action.payload
      state.searchQuery = action.payload
    },
    resetRouteTrigger:(state,action) => {
      state.routeTrigger = action.payload
    }
  }
})

export const { getSearchTerm, resetRouteTrigger } = searchSlice.actions;

export const selectSearch = (state:RootState) => state.search
export default searchSlice.reducer