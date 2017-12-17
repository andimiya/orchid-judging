import React, { Component } from 'react';
import $ from 'jquery';
import { POST_TRANSACTIONS } from '../constants';
import Notice from './Notice';

const USER_ID = 1;

class InvestmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crypto_id: '',
      crypto_symbol: '',
      crypto_name: '',
      coin_purchased: '',
      exchange_rate: '',
      usd_invested: '',
      sentStatus: '',
      selectValue: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDropdownChange(event) {
    this.setState({
      selectValue: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      crypto_id: Number(this.state.selectValue),
      user_id: USER_ID,
      coin_purchased: Number(this.state.coin_purchased),
      exchange_rate: Number(this.state.exchange_rate),
      usd_invested: Number(this.state.usd_invested),
    };
    $.post({
      url: POST_TRANSACTIONS,
      data: data
    })
      .then(data => {
        if (data.status === 200) {
          this.props.getTransactions();
          this.setState({
            sentStatus: 'sent',
            crypto_id: '',
            coin_purchased: '',
            exchange_rate: '',
            usd_invested: ''
          });
        } else {
          this.setState({ sentStatus: 'error' });
        }
      })
      .catch(() => this.setState({ sentStatus: 'error' }));
  }

  render(props) {
    return (
      <div className="investment-form-container">
        <div className="form-group">
          {(() => {
            switch (this.state.sentStatus) {
              case 'sent':
                return (
                  <Notice
                    status="Transaction posted successfully"
                    statusClass="success-message"
                    noticeContainerClass="notice-container-success"
                  />
                );
              case 'error':
                return (
                  <Notice
                    status="An error occured, please try again"
                    noticeContainerClass="notice-container-error"
                    statusClass="error-message"
                  />
                );
              default:
                return '';
            }
          })()}
          <div className="form-container">
            <form onSubmit={this.handleSubmit} className="form-inline">
              <select
                value={this.state.selectValue}
                onChange={this.handleDropdownChange}
                name="crypto_id"
                className="form-control"
              >
              <option name="default" value="default">Select a Currency</option>
                {this.props.currencies.map((currencies, i) => {
                  return(
                    <option value={currencies.id} key={currencies.id}>{currencies.name}</option>
                  )
                })}
              </select>
              <input
                type="number"
                onChange={this.handleChange}
                placeholder="Coins Purchased"
                name="coin_purchased"
                value={this.state.coin_purchased}
                className="form-control"
              />
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Exchange Rate Purchased at (USD)"
                name="exchange_rate"
                value={this.state.exchange_rate}
                className="form-control long"
              />
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Amount Invested (USD)"
                name="usd_invested"
                value={this.state.usd_invested}
                className="form-control"
              />
              <input
                className="btn btn-primary"
                type="submit"
                value="Enter Investment"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default InvestmentForm;
