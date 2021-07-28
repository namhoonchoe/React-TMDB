import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '@redux/store';

interface IBookMark {
  type:string,
  id:number,
  bookMarkInfo:any
}

type bookMarkArray = Array<IBookMark>

interface IState {
  movieBookMark:bookMarkArray
  seriesBookMark:bookMarkArray
}

const bookMarkState:IState = {
  movieBookMark:[] as bookMarkArray,
  seriesBookMark:[] as bookMarkArray
}

const bookMarkSlice = createSlice({
  name:"bookMark",
  initialState:bookMarkState, 
  reducers:{
    addBookMark:(state:IState ,action:PayloadAction<IBookMark>) => {
      const { movieBookMark, seriesBookMark } = state
      const contentType = action.payload.type
      if(contentType ==="movie") {
        return {
          movieBookMark:[...movieBookMark,action.payload],
          seriesBookMark
        }
      } else {
        return {
          movieBookMark:movieBookMark,
          seriesBookMark:[...seriesBookMark,action.payload]
        }
      }
    },
    removeBookMark:(state:IState ,action:PayloadAction<IBookMark>) => {
      const contentType = action.payload.type
      const { movieBookMark, seriesBookMark } = state
      if(contentType ==="movie") {
        return {
          movieBookMark:movieBookMark.filter((bookMark) => bookMark.id !== action.payload.id),
          seriesBookMark
        }
      } else {
        return {
          movieBookMark:movieBookMark,
          seriesBookMark:seriesBookMark.filter((bookMark) => bookMark.id !== action.payload.id)
        }
      }
    }
  }
})

export const { addBookMark, removeBookMark } = bookMarkSlice.actions;

export const selectBookMark = (state:RootState) => state.bookMark

export default bookMarkSlice.reducer