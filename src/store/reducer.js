import { combineReducers } from "redux";
import { mainReducer } from "./main";

// Combine Reducers
export default combineReducers({
  main: mainReducer
});
