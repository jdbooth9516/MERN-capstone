import { REMOVE_SWITCH, SET_SWITCH } from './types';
import * as uuid from 'uuid';

export const setSwitch = (msg, price) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: SET_SWITCH,
    payload: { msg, price, id },
  });
};

export const removeBuildSwitch = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_SWITCH,
    payload: id,
  });
};
