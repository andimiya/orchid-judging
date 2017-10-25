import React from 'react';

const TransactionTable = (props) => {

  console.log(props.transactions[0], 'props');
  let data = props.transactions[0];

  return (
    <div>
      {data.amountusd}
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
