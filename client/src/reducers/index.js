import { combineReducers } from 'redux';
import alert from './alert';
import buildname from './buildname';
import buildlayout from './layout';

export default combineReducers({
  alert,
  buildname,
  buildlayout,
});
