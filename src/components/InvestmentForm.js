import React, { Component } from 'react';
import $ from 'jquery';
import { POST_TRANSACTIONS, COINMARKET_API } from '../constants';
import Notice from './Notice';

class InvestmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crypto_id: '',
      coin_purchased: '',
      exchange_rate: '',
      usd_invested: '',
      sentStatus: '',
      selectValue: '',
      currencies: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getAllCurrencies = this.getAllCurrencies.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount(){
    this.getAllCurrencies();
  }

  getAllCurrencies(){
    $.get(COINMARKET_API).then(currencies => {
      console.log(currencies, 'currencies');
      this.setState({
        currencies: currencies
      });
    });
  }

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
      crypto_id: this.state.selectValue,
      coin_purchased: Number(this.state.coin_purchased),
      exchange_rate: Number(this.state.exchange_rate),
      usd_invested: Number(this.state.usd_invested),
    };
    $.post({
      url: POST_TRANSACTIONS,
      data: data
    })
      .then(data => {
        if (data.statusCode === 200) {
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
        <div className="investment-form-inner">
          {(() => {
            switch (this.state.sentStatus) {
              case 'sent':
                return (
                  <Notice
                    status="Your message has been sent! We'll contact you shortly"
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
            <form onSubmit={this.handleSubmit}>
              <select
                value={this.state.selectValue}
                onChange={this.handleDropdownChange}
                name="crypto_id"
              >
              <option name="default" value="default">Select a Currency</option>
                {this.state.currencies.map((currencies, i) => {
                  return(
                    <option value={currencies.rank} key={currencies.id}>{currencies.name}</option>
                  )
                })}
              </select>
              <input
                type="number"
                onChange={this.handleChange}
                placeholder="Coins Purchased"
                name="coin_purchased"
                value={this.state.coin_purchased}
                className="input"
              />
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Exchange Rate Purchased at (USD)"
                name="exchange_rate"
                value={this.state.exchange_rate}
                className="input"
              />
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Amount Invested (USD)"
                name="usd_invested"
                value={this.state.usd_invested}
                className="input"
              />
              <input
                className="contact-button"
                type="submit"
                value="Enter My Investment"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default InvestmentForm;
