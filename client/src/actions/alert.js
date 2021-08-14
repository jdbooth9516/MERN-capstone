import { SET_ALERT, REMOVE_ALERT } from './types';
import * as uuid from 'uuid';

export const setAlert =
  (msg, alertType, timeout = 2500) =>
  (dispatch) => {
    const id = uuid.v4();
    //this is what id going to send this to the reducer
    dispatch({
      // set alert defined in the types.js folder
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
