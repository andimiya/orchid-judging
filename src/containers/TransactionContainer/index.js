import React from 'react';
import { ajax } from 'jquery';
import { GET_TRANSACTIONS } from '../../constants';
import InvestmentForm from '../../components/InvestmentForm';
import TransactionTable from '../../components/TransactionTable';

const USER_ID = 1;

class TransactionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.getTransactions = this.getTransactions.bind(this);

    this.state = {
      allData: [],
      exchangeRates: [],
      error: ''
    };
  }

  componentDidMount(){
    this.getTransactions();
  }

  getTransactions(){
    ajax(`${GET_TRANSACTIONS}?user_id=${USER_ID}`).then(data => {
      this.setState({ allData: data.data })
    })
  }

  render(props) {
    return (
      <div>
        <div className="transaction-container">
          <div className="investment-line-container">
            <TransactionTable allData={this.state.allData}/>
          </div>
        </div>
        <div>
          <InvestmentForm
            currencies={this.state.allCurrencies} />
        </div>
      </div>
    )
  };
};

export default TransactionContainer;
