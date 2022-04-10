import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    page: 1,
  },
  reducers: {
    nextPage: (state) => {
      state.page = state.page + 1;
    },
    prevPage: (state) => {
      state.page = state.page - 1;
    },
  },
});

export const { nextPage, prevPage } = peopleSlice.actions;

export const selectPage = (state: RootState) => state.people;
export default peopleSlice.reducer;
