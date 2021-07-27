import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '@redux/store';

const bookMarkSlice = createSlice({
  name:"bookMark",
  initialState:{
    searchTerm:""
  },
  reducers:{
    getSearchTerm: (state,action) => {
      state.searchTerm = action.payload
    }
  }
})

export const { getSearchTerm } = bookMarkSlice.actions;

export const selectBookMark = (state:RootState) => state.searchReducer.searchTerm

export default bookMarkSlice.reducer