import { ajax } from 'jquery';
import { CRYPTO_TYPES_SUM, GET_TRANSACTIONS } from '../constants';

const GET_TRANSACTION_SUMS = 'crypto-app/transactions/GET_TRANSACTION_SUMS';
const GET_TRANSACTION_SUMS_FAIL =
  'crypto-app/transactions/GET_TRANSACTION_SUMS_FAIL';
const GET_USER_TRANSACTIONS = 'crypto-app/transactions/GET_USER_TRANSACTIONS';
const GET_USER_TRANSACTIONS_FAIL =
  'crypto-app/transactions/GET_USER_TRANSACTIONS_FAIL';

const initialState = {
  transactionSums: [],
  userTransactions: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_USER_TRANSACTIONS:
      return {
        ...state,
        userTransactions: action.userTransactions
      };
    case GET_USER_TRANSACTIONS_FAIL:
    case GET_TRANSACTION_SUMS:
      return {
        ...state,
        transactionSums: action.transactionSums
      };
    case GET_TRANSACTION_SUMS_FAIL:
    default:
      return state;
  }
}

export function getTransactions(user_id) {
  return dispatch => {
    return ajax(`${GET_TRANSACTIONS}?user_id=${user_id}`)
      .then(result => {
        dispatch({
          type: GET_USER_TRANSACTIONS,
          userTransactions: result.data
        });
        return result;
      })
      .catch(err => {
        dispatch({ type: GET_USER_TRANSACTIONS_FAIL });
        throw err;
      });
  };
}

export function getTransactionSums(user_id) {
  return dispatch => {
    return ajax(`${CRYPTO_TYPES_SUM}?user_id=${user_id}`)
      .then(result => {
        dispatch({ type: GET_TRANSACTION_SUMS, transactionSums: result.data });
        return result;
      })
      .catch(err => {
        dispatch({ type: GET_TRANSACTION_SUMS_FAIL });
        throw err;
      });
  };
}
