import { REMOVE_SERVICE, SET_SERVICE } from './types';
import * as uuid from 'uuid';

export const setService = (msg, price) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: SET_SERVICE,
    payload: { msg, price, id },
  });
};

export const removeBuildServices = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_SERVICE,
    payload: id,
  });
};