import { SET_SWITCH, REMOVE_SWITCH } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SWITCH:
      return [...state, payload];
    case REMOVE_SWITCH:
      return state.filter(switches => switches.id !== payload);
    default:
      return state;
  }
}
