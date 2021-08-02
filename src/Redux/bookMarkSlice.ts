import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '@redux/store';

interface IBookMark {
  type:string,
  id:number,
  bookMarkInfo:any
}

type bookMarkArray = Array<IBookMark>

interface IState {
  movieBookMarks:bookMarkArray
  seriesBookMarks:bookMarkArray
}

const bookMarkState:IState = {
  movieBookMarks:[] as bookMarkArray,
  seriesBookMarks:[] as bookMarkArray
}

const bookMarkSlice = createSlice({
  name:"bookMark",
  initialState:bookMarkState, 
  reducers:{
    addBookMark:(state:IState ,action:PayloadAction<IBookMark>) => {
      const { movieBookMarks, seriesBookMarks } = state
      const contentType = action.payload.type
      if(contentType === "movie") {
        return {
          movieBookMarks:[...movieBookMarks,action.payload],
          seriesBookMarks
        }
      } else {
        return {
          movieBookMarks:movieBookMarks,
          seriesBookMarks:[...seriesBookMarks,action.payload]
        }
      }
    },
    removeBookMark:(state:IState ,action:PayloadAction<IBookMark>) => {
      const contentType = action.payload.type
      const { movieBookMarks, seriesBookMarks } = state
      if(contentType === "movie") {
        return {
          movieBookMarks:movieBookMarks.filter((bookMark) => bookMark.id !== action.payload.id),
          seriesBookMarks
        }
      } else {
        return {
          movieBookMarks:movieBookMarks,
          seriesBookMarks:seriesBookMarks.filter((bookMark) => bookMark.id !== action.payload.id)
        }
      }
    }
  }
})

export const { addBookMark, removeBookMark } = bookMarkSlice.actions;

export const selectBookMark = (state:RootState) => state.bookMark

export const selectMovieBookMarks =  (state:RootState) => {
  return state.bookMark.movieBookMarks.map((movieBookMark) => movieBookMark['bookMarkInfo'])
}
export const selectSeriesBookMarks =  (state:RootState) => {
  return state.bookMark.seriesBookMarks.map((seiresBookMark) => seiresBookMark['bookMarkInfo'])
}

export default bookMarkSlice.reducer