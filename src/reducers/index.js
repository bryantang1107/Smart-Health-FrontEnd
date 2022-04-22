import { combineReducers } from "redux";
import roomReducer from "./room";
import storeReducer from "./store";
import navReducer from "./nav";
import roleReducer from "./userRole";

export const allReducers = combineReducers({
  storeReducer,
  roomReducer,
  navReducer,
  roleReducer,
});
