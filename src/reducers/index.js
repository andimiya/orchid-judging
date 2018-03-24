import { combineReducers } from 'redux';
import { default as auth } from '../redux/auth';
import { default as currencies } from '../redux/currencies';
import { default as exchangeRates } from '../redux/exchangeRates';

const rootReducer = combineReducers({
  auth,
  currencies,
  exchangeRates
});

export default rootReducer;
