import { REMOVE_EXTRA, REMOVE_SWITCH, SET_EXTRA } from './types';
import * as uuid from 'uuid';

export const setExtra = (msg, price) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: SET_EXTRA,
    payload: { msg, price, id },
  });
};

export const removeBuildExtra = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_SWITCH,
    payload: id,
  });
};
