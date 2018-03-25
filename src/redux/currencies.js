import { ajax } from 'jquery';
import { CURRENCIES, CRYPTO_TYPES, COINMARKET_API } from '../constants';

const GET_CURRENCIES = 'crypto-app/currencies/GET_CURRENCIES';
const GET_CURRENCIES_FAIL = 'crypto-app/currencies/GET_CURRENCIES_FAIL';
const GET_USERS_CRYPTOTYPES = 'crypto-app/currencies/GET_USERS_CRYPTOTYPES';
const GET_USERS_CRYPTOTYPES_FAIL =
  'crypto-app/currencies/GET_USERS_CRYPTOTYPES_FAIL';

const initialState = {
  currencies: [],
  cryptoTypes: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CURRENCIES:
      return {
        ...state,
        currencies: action.currenciesData
      };
    case GET_CURRENCIES_FAIL:
    case GET_USERS_CRYPTOTYPES:
      return {
        ...state,
        cryptoTypes: action.cryptoTypes
      };
    case GET_USERS_CRYPTOTYPES_FAIL:
    default:
      return state;
  }
}

export function getAllCurrencies() {
  return dispatch => {
    return ajax(CURRENCIES)
      .then(result => {
        dispatch({ type: GET_CURRENCIES, currenciesData: result.data });
        return result;
      })
      .catch(err => {
        dispatch({ type: GET_CURRENCIES_FAIL });
        throw err;
      });
  };
}

export function getUsersCryptoTypes(user_id) {
  return dispatch => {
    return ajax(`${CRYPTO_TYPES}?user_id=${user_id}`)
      .then(result => {
        dispatch({ type: GET_USERS_CRYPTOTYPES, cryptoTypes: result.data });
        return result;
      })
      .catch(err => {
        dispatch({ type: GET_USERS_CRYPTOTYPES_FAIL });
        throw err;
      });
  };
}
