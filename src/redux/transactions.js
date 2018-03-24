import { ajax } from 'jquery';
import { CRYPTO_TYPES_SUM } from '../constants';

const GET_TRANSACTIONS = 'crypto-app/transactions/GET_TRANSACTIONS';
const GET_TRANSACTIONS_FAIL = 'crypto-app/transactions/GET_TRANSACTIONS_FAIL';

const initialState = {
  transactionSums: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactionSums: action.transactionSums
      };
    case GET_TRANSACTIONS_FAIL:
    default:
      return state;
  }
}

export function getTransactionSums(user_id) {
  return dispatch => {
    return ajax(`${CRYPTO_TYPES_SUM}?user_id=${user_id}`)
      .then(result => {
        dispatch({ type: GET_TRANSACTIONS, transactionSums: result.data });
        return result;
      })
      .catch(err => {
        dispatch({ type: GET_TRANSACTIONS_FAIL });
        throw err;
      });
  };
}
