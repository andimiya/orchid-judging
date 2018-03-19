import React, { Component } from 'react';
import { ajax } from 'jquery';
import {
  USERS,
  GET_TRANSACTIONS,
  DELETE_TRANSACTIONS,
  CURRENCIES
} from '../../constants';
import InvestmentForm from '../../components/InvestmentForm';
import TransactionTable from '../../components/TransactionTable';

class TransactionContainer extends Component {
  constructor(props) {
    super(props);

    this.getUserId = this.getUserId.bind(this);
    this.getAllCurrencies = this.getAllCurrencies.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);

    this.state = {
      allData: [],
      exchangeRates: [],
      currencies: [],
      user_id: null,
      error: ''
    };
  }

  componentDidMount() {
    this.getUserId();
    this.getAllCurrencies();
  }

  getUserId() {
    let user_email = this.props.userInformation.email;
    ajax(`${USERS}?email=${user_email}`).then(cryptoTypes => {
      this.setState({ user_id: cryptoTypes.data[0].id }, this.getTransactions);
    });
  }

  getAllCurrencies() {
    ajax(CURRENCIES).then(currencies => {
      this.setState({
        currencies: currencies.data
      });
    });
  }

  getTransactions() {
    let user_id = this.state.user_id;
    ajax(`${GET_TRANSACTIONS}?user_id=${user_id}`).then(data => {
      this.setState({ allData: data.data });
    });
  }

  deleteTransaction(e) {
    e.preventDefault();
    ajax({
      url: `${DELETE_TRANSACTIONS}/${e.target.id}`,
      type: 'DELETE'
    }).done(() => {
      this.getTransactions();
    });
  }

  render(props) {
    return (
      <div className="transaction-container outer">
        <div className="transaction-table-container">
          <TransactionTable
            allData={this.state.allData}
            onClick={this.deleteTransaction}
          />
        </div>
        <div className="investment-form-container-outer">
          <InvestmentForm
            currencies={this.state.currencies}
            getTransactions={this.getTransactions}
            userId={this.state.user_id}
          />
        </div>
      </div>
    );
  }
}

export default TransactionContainer;
