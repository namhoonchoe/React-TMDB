import { combineReducers } from "redux";
import searchReducer from "./searchSlice"
import bookMarkReducer from "./bookMarkSlice"

export const rootReducer = combineReducers({
  search:searchReducer,
  bookMark:bookMarkReducer
})

export type RootState = ReturnType<typeof rootReducer>
