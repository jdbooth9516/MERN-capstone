import { REMOVE_NAME, SET_NAME } from './types';
import * as uuid from 'uuid';

export const setName = (msg) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: SET_NAME,
    payload: { msg, id },
  });
};

export const removeBuildName = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_NAME,
    payload: id,
  });
};
