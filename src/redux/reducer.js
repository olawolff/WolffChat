import * as types from "./actionTypes";

export default function app(state = {}, action = {}) {
  switch (action.type) {
    case types.LOGOUT:
      delete state.user;
      return state;

    case types.LOGIN:
      state.user = action.user;
      return state;

    default:
      return state;
  }
}
