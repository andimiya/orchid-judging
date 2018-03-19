import { combineReducers } from 'redux';
import { default as auth } from '../redux/auth';

const rootReducer = combineReducers({
  auth
});

export default rootReducer;
