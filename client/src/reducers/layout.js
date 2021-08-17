import { SET_LAYOUT, REMOVE_LAYOUT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LAYOUT:
      return [...state, payload];
    case REMOVE_LAYOUT:
      return state.filter((layout) => layout.id !== payload);
    default:
      return state;
  }
}
