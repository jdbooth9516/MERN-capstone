import { SET_NAME } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_NAME:
      return [...state, payload];
    default:
      return state;
  }
}