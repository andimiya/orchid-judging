import React from 'react';
import moment from 'moment';

const TransactionTable = (props) => {
  return (
    <div className="transaction-table-container">
      <table className="table table-striped table-sm">
        <thead>
          <th>Date/Time Entered</th>
          <th>Currency</th>
          <th>Amount Invested (USD)</th>
          <th>Amount of Coin Purchased</th>
        </thead>
        <tbody>
        {props.allData.map(transactions => {
          return (
            <tr key={transactions.transaction_id}>
              <td key={transactions.updated_at}>{moment.utc(transactions.updated_at).format('MMM DD, YYYY - hh:mm a')}</td>
              <td>{transactions.crypto_type_id}</td>
              <td>{transactions.usd_invested}</td>
              <td>{transactions.coin_purchased}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
};

export default TransactionTable;
