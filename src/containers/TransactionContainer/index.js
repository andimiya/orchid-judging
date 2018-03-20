import React, { Component } from 'react';
import { ajax } from 'jquery';
import { connect } from 'react-redux';
import {
  GET_TRANSACTIONS,
  DELETE_TRANSACTIONS,
  CURRENCIES
} from '../../constants';

import { getDatabaseUserInfo, getCognitoUser } from '../../redux/auth';
import InvestmentForm from '../../components/InvestmentForm';
import TransactionTable from '../../components/TransactionTable';

function mapStateToProps(state) {
  return {
    databaseUserInfo: state.auth.userInformation
  };
}

class TransactionContainer extends Component {
  constructor(props) {
    super(props);

    this.getTransactions = this.getTransactions.bind(this);
    this.getAllCurrencies = this.getAllCurrencies.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);

    this.state = {
      allData: [],
      exchangeRates: [],
      currencies: [],
      userId: '',
      error: ''
    };
  }

  componentDidMount() {
    this.getTransactions();
    this.getAllCurrencies();
  }

  getAllCurrencies() {
    ajax(CURRENCIES).then(currencies => {
      this.setState({
        currencies: currencies.data
      });
    });
  }

  getTransactions() {
    this.props
      .getDatabaseUserInfo()
      .then(data => {
        let user_id = data.id;
        ajax(`${GET_TRANSACTIONS}?user_id=${user_id}`)
          .then(data => {
            this.setState({ allData: data.data });
          })
          .catch(err => {
            throw err;
          });
        return data;
      })
      .catch(err => {
        throw err;
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

  render() {
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

export default connect(mapStateToProps, {
  getDatabaseUserInfo,
  getCognitoUser
})(TransactionContainer);
