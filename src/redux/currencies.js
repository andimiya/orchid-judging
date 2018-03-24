import { ajax } from 'jquery';
import { CURRENCIES } from '../constants';

const GET_CURRENCIES = 'crypto-app/currencies/GET_CURRENCIES';
const GET_CURRENCIES_FAIL = 'crypto-app/currencies/GET_CURRENCIES_FAIL';

const initialState = {
  currencies: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CURRENCIES:
      return {
        ...state,
        currencies: action.currenciesData
      };
    case GET_CURRENCIES_FAIL:
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
