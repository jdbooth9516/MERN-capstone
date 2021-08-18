import { combineReducers } from 'redux';
import alert from './alert';
import buildname from './buildname';
import buildlayout from './layout';
import buildswitch from './switch';

export default combineReducers({
  alert,
  buildname,
  buildlayout,
  buildswitch,
});
