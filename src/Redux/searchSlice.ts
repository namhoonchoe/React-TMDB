import { createSlice } from "@reduxjs/toolkit";

const state:ISearchSlice = {
  searchTerm:null
}

const searchSlice = createSlice({
  name:"search",
  initialState:state,
  reducers:{
    getSearchTerm(state,action){
      return state.searchTerm = action.payload 
    }
  }

})

export const { getSearchTerm } = searchSlice.actions;

export const selectSearch = (state:ISearchSlice) => state.searchTerm

export default searchSlice.reducer