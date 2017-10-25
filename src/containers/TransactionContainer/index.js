import React from 'react';
import { CRYPTO_API_INVESTMENTS } from '../../constants';
import { ajax } from 'jquery';
import moment from 'moment';
import InvestmentForm from '../../components/InvestmentForm';
import TransactionTable from '../../components/TransactionTable';

class TransactionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.getTransactions = this.getTransactions.bind(this);

    this.state = {
      allData: [],
      error: ''
    };
  }

  componentDidMount(){
    this.getTransactions();
  }

  getTransactions(){
    ajax(CRYPTO_API_INVESTMENTS).then(data => {
      this.setState({ allData: data })
    })
  }

  render(props) {
    console.log(this.state.allData, 'data');
    return (
      <div>
        <div className="transaction-container">
          <div className="investment-line-container">
            <div className="investment-line">
              <div>Date Updated</div>
              <div>Currency</div>
              <div>Amount Invested (USD)</div>
              <div>Amount of Coin Purchased</div>
            </div>
          {this.state.allData.map((transactions, i) => {
            return(
              <div className="investment-line">
                <div className="column">{moment(transactions.updatedAt).format('MMM DD, YYYY hh:mm a')}</div>
                <div className="column">{transactions.currency}</div>
                <div className="column">{transactions.amountusd}</div>
                <div className="column">{transactions.coinowned}</div>
              </div>
            )
          })}
          </div>
        </div>
        <div>
          <InvestmentForm
            currencies={this.state.allData} />
        </div>
      </div>
    )
  };
};

export default TransactionContainer;
