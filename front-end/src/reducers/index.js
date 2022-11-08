import { combineReducers } from 'redux';

import auth from './auth';
import catan from './catan';
import message from './message';

export default combineReducers({
  auth,
  catan,
  message,
});
