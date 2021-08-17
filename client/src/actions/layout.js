import { SET_LAYOUT } from './types';
import * as uuid from 'uuid';

export const setLayout = (msg, price) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: SET_LAYOUT,
    payload: { msg, price, id },
  });
};
