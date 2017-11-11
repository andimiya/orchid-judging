import React from 'react';
import moment from 'moment';

const TransactionTable = (props) => {

  console.log(props, 'props');

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
          console.log(transactions);
          return (
            <tr key={transactions.transaction_id}>
              <td key={transactions.updated_at}>{moment.utc(transactions.updated_at).format('MMM DD, YYYY - hh:mm a')}</td>
              <td key={transactions.crypto_type_id}>{transactions.crypto_type_id}</td>
              <td key={transactions.usd_invested}>{transactions.usd_invested}</td>
              <td key={transactions.coin_purchased}>{transactions.coin_purchased}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
};

export default TransactionTable;

  //
  // {props.transactions.map((transactions, i) => {
  //   return(
  //     <div>{transactions.amountusd}</div>
  //   )
  // })}
