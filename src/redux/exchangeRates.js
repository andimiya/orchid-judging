import { ajax } from 'jquery';
import { COINMARKET_API } from '../constants';

const GET_EXCHANGERATES = 'crypto-app/exchangeRates/GET_EXCHANGERATES';
const GET_EXCHANGERATES_FAIL =
  'crypto-app/exchangeRates/GET_EXCHANGERATES_FAIL';

const initialState = {
  exchangeRates: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_EXCHANGERATES:
      return {
        ...state,
        exchangeRates: action.result
      };
    case GET_EXCHANGERATES_FAIL:
    default:
      return state;
  }
}

export function getExchangeRates() {
  return dispatch => {
    return ajax(COINMARKET_API)
      .then(result => {
        dispatch({ type: GET_EXCHANGERATES, result });
        return result;
      })
      .catch(err => {
        dispatch({ type: GET_EXCHANGERATES_FAIL });
        throw err;
      });
  };
}
