import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '@redux/store';

const searchSlice = createSlice({
  name:"search",
  initialState:{
    searchTerm:""
  },
  reducers:{
    getSearchTerm: (state,action) => {
      state.searchTerm = action.payload
    }
  }
})

export const { getSearchTerm } = searchSlice.actions;


export const selectSearch = (state:RootState) => state.searchReducer.searchTerm

export default searchSlice.reducer