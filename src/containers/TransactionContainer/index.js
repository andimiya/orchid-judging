import React, { Component } from 'react';
import { ajax } from 'jquery';
import { connect } from 'react-redux';
import { DELETE_TRANSACTIONS } from '../../constants';

import { getDatabaseUserInfo } from '../../redux/auth';
import { getAllCurrencies } from '../../redux/currencies';
import { getTransactions } from '../../redux/transactions';

import InvestmentForm from '../../components/InvestmentForm';
import TransactionTable from '../../components/TransactionTable';

function mapStateToProps(state) {
  return {
    databaseUserInfo: state.auth.userInformation,
    currencies: state.currencies.currencies,
    transactions: state.transactions.userTransactions
  };
}

class TransactionContainer extends Component {
  constructor(props) {
    super(props);

    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.getUserTransactions = this.getUserTransactions.bind(this);

    this.state = {
      error: ''
    };
  }

  componentDidMount() {
    this.getUserTransactions();
    this.props.getAllCurrencies();
  }

  getUserTransactions() {
    this.props
      .getDatabaseUserInfo()
      .then(_ => {
        let user_id = this.props.databaseUserInfo.id;
        this.props.getTransactions(user_id);
      })
      .catch(err => {
        throw err;
      });
  }

  deleteTransaction(e) {
    e.preventDefault();
    ajax({
      url: DELETE_TRANSACTIONS,
      type: 'DELETE',
      data: {
        id: e.target.id,
        user_id: this.props.databaseUserInfo.id
      }
    }).done(() => {
      this.getUserTransactions();
    });
  }

  render() {
    return (
      <div className="transaction-container outer">
        <div className="transaction-table-container">
          <TransactionTable
            allData={this.props.transactions}
            onClick={this.deleteTransaction}
          />
        </div>
        <div className="investment-form-container-outer">
          <InvestmentForm
            currencies={this.props.currencies}
            getTransactions={this.getUserTransactions}
            userId={this.props.databaseUserInfo.id}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getDatabaseUserInfo,
  getAllCurrencies,
  getTransactions
})(TransactionContainer);
