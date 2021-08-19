import { combineReducers } from 'redux';
import alert from './alert';
import buildname from './buildname';
import buildlayout from './layout';
import buildswitch from './switch';
import buildservice from './service';
import buildextra from './extra';
import total from './total';

export default combineReducers({
  alert,
  buildname,
  buildlayout,
  buildswitch,
  buildservice,
  buildextra,
  total,
});
