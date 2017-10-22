import React, { Component } from 'react';
import $ from 'jquery';
import { CRYPTO_API_POST_INVESTMENT } from '../constants';
import Notice from './Notice';

class InvestmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: '',
      coinowned: '',
      rate: '',
      amountusd: '',
      sentStatus: '',
      selectValue: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
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
      currency: this.state.selectValue,
      coinowned: Number(this.state.coinowned),
      rate: Number(this.state.rate),
      amountusd: Number(this.state.amountusd),
    };
    console.log(data, 'data');
    $.post({
      url: CRYPTO_API_POST_INVESTMENT,
      data: data
    })
      .then(data => {
        if (data.statusCode === 200) {
          this.setState({
            sentStatus: 'sent',
            currency: '',
            coinowned: '',
            rate: '',
            amountusd: ''
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
                name="currency"
              >
              <option name="default" value="default">Select a Currency</option>
                {this.props.currencies.map((currencies, i) => {
                  return(
                    <option value={currencies.symbol} key={currencies.id}>{currencies.name}</option>
                  )
                })}
              </select>
              <input
                type="number"
                onChange={this.handleChange}
                placeholder="Amount of Coin Purchased"
                name="coinowned"
                value={this.state.coinowned}
                className="input"
              />
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Exchange Rate Purchased at (USD)"
                name="rate"
                value={this.state.rate}
                className="input"
              />
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Amount Invested (USD)"
                name="amountusd"
                value={this.state.amountusd}
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
