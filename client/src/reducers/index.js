import { combineReducers } from 'redux';
import alert from './alert';
import buildname from './buildname';
import buildlayout from './layout';
import buildswitch from './switch';
import buildservice from './service';

export default combineReducers({
  alert,
  buildname,
  buildlayout,
  buildswitch,
  buildservice,
});
