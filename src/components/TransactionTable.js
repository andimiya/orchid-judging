import React from 'react';

const TransactionTable = (props) => {

  console.log(props, 'props');

  return (
    <div className="transaction-table-container">
      <table className="table table-striped table-sm table-bordered">
        <thead>
          <th>Date Updated</th>
          <th>Currency</th>
          <th>Amount Invested (USD)</th>
          <th>Amount of Coin Purchased</th>
        </thead>
        <tbody>
        {props.allData.map(transactions => {
          return (
            <tr>
              <td>{transactions.updated_at}</td>
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

  //
  // {props.transactions.map((transactions, i) => {
  //   return(
  //     <div>{transactions.amountusd}</div>
  //   )
  // })}
