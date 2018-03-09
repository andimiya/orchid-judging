import { combineReducers } from 'redux';
// import { default as decks } from '../redux/decks';
// import { default as words } from '../redux/words';
import { default as auth } from '../redux/auth';

const rootReducer = combineReducers({
  // decks,
  // words,
  auth,
});

export default rootReducer;
