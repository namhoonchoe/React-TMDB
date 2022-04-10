import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import searchReducer from "./searchSlice";
import bookMarkReducer from "./bookMarkSlice";
import discoverReducer from "./discoverSlice";
import peopleSlice from "./peopleSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["bookMark"],
};

const rootReducer = combineReducers({
  search: searchReducer,
  bookMark: bookMarkReducer,
  discover: discoverReducer,
  people:peopleSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
