import { SET_EXTRA, REMOVE_EXTRA } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_EXTRA:
      return [...state, payload];
    case REMOVE_EXTRA:
      return state.filter((extra) => extra.id !== payload);
    default:
      return state;
  }
}
