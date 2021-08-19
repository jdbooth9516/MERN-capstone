import { REMOVE_TOTAL, SET_TOTAL } from './types';


export const setTotal = (currentPrice, productPrice) => (dispatch) => {
  dispatch({
    type: SET_TOTAL,
    payload: { currentPrice, productPrice },
  });
};

export const removeFromTotal = (currentPrice, productPrice) => (dispatch) => {
  dispatch({
    type: REMOVE_TOTAL,
    payload: { currentPrice, productPrice },
  });
};
