import { combineReducers } from 'redux';
import { default as auth } from '../redux/auth';
import { default as scores } from '../redux/scores';

const rootReducer = combineReducers({
  auth,
  scores
});

export default rootReducer;
