import * as types from "./types";

// Set Fetching
export function setFetching(value) {
  return {
    type: types.MAIN_SET_FETCHING,
    value: value
  };
}
