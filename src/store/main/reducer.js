import * as types from "./types";
import initialState from "./initialState";

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.MAIN_SET_FETCHING:
      return {
        ...state,
        isFetching: action.value
      };

    default:
      return state;
  }
}
