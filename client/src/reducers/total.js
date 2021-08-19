import { SET_TOTAL, REMOVE_TOTAL } from '../actions/types';

const initialState = 0;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TOTAL:
      return payload.currentPrice + payload.productPrice;
    case REMOVE_TOTAL:
      return state.filter((switches) => switches.id !== payload);
    default:
      return state;
  }
}
