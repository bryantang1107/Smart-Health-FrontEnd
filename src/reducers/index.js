import { combineReducers } from "redux";
import roomReducer from "./room";
import storeReducer from "./store";
import navReducer from "./nav";

export const allReducers = combineReducers({
  storeReducer,
  roomReducer,
  navReducer,
});
