import React from 'react';
import moment from 'moment';
const deleteIcon = require('../assets/delete.svg');

const TransactionTable = (props) => {
  return (
    <div className="transaction-table-container container">
      <table className="table table-striped table-responsive table-sm">
        <thead>
          <tr>
            <th className="align-middle">Date/Time Entered</th>
            <th className="align-middle">Coin</th>
            <th className="align-middle">USD Invested</th>
            <th className="align-middle">Amount of Coin</th>
            <th className="align-middle">Date Purchased</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {props.allData.map(transactions => {
          return (
            <tr key={transactions.transaction_id}>
              <td key={transactions.updated_at}>{moment.utc(transactions.updated_at).format('MMM DD, YYYY - hh:mm a')}</td>
              <td>{transactions.name}</td>
              <td>{transactions.usd_invested}</td>
              <td>{transactions.coin_purchased}</td>
              <td>{transactions.purchased_at}</td>
              <td>
                <a onClick={props.onClick}>
                  <img
                    className="delete-button"
                    id={transactions.transaction_id}
                    src={deleteIcon}
                    alt="Delete Transaction"
                  />
                </a>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
};

export default TransactionTable;
