import { combineReducers } from 'redux';
import { default as auth } from '../redux/auth';
import { default as currencies } from '../redux/currencies';
import { default as exchangeRates } from '../redux/exchangeRates';
import { default as transactions } from '../redux/transactions';

const rootReducer = combineReducers({
  auth,
  currencies,
  exchangeRates,
  transactions
});

export default rootReducer;
