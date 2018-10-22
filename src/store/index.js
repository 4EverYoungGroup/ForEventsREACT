import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { Service, Firebase } from "../api";
export { doSetFetchingAction } from "./actions";

/* create */
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(Service, Firebase))
);
