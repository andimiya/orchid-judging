import React, { Component } from 'react';
import $ from 'jquery';
import DatePicker from 'react-datepicker';
import { POST_TRANSACTIONS, HISTORICAL_EXCHANGE } from '../constants';
import moment from 'moment';
import Notice from './Notice';

import 'react-datepicker/dist/react-datepicker.css';

class InvestmentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      crypto_id: '',
      coin_purchased: '',
      exchange_rate: '',
      hist_exchange: '',
      hist_timestamp: '',
      hist_symbol: '',
      usd_invested: '',
      purchased_at: '',
      sentStatus: '',
      selectValue: '',
      startDate: moment()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.findExchange = this.findExchange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEvent(event) {
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
    let exchangeRate = this.state.usd_invested / this.state.coin_purchased;
    const data = {
      crypto_id: Number(this.state.selectValue),
      user_id: this.props.userId,
      coin_purchased: Number(this.state.coin_purchased),
      exchange_rate: Number(exchangeRate),
      usd_invested: Number(this.state.usd_invested),
      purchased_at: moment(this.state.startDate._d).format(
        'YYYY-MM-DD HH:mm:ss'
      )
    };
    $.post({
      url: POST_TRANSACTIONS,
      data: data
    })
      .then(data => {
        if (data.status === 200) {
          this.props.getTransactions();
          this.props.getTransactionSums();
          this.setState({
            sentStatus: 'sent',
            crypto_id: '',
            coin_purchased: '',
            exchange_rate: '',
            usd_invested: '',
            startDate: moment()
          });
        } else {
          this.setState({ sentStatus: 'error' });
        }
      })
      .catch(() => this.setState({ sentStatus: 'error' }));
  }

  findExchange(event) {
    event.preventDefault();
    $.get(
      `${HISTORICAL_EXCHANGE}?symbol=${
        this.state.selectValue
      }&purchased_at=${moment(this.state.startDate._d).unix()}`
    ).then(data => {
      for (var key in data) {
        let symbol = data[key];
        this.setState({
          hist_exchange: symbol.USD,
          hist_timestamp: this.state.startDate._d,
          hist_symbol: this.state.selectValue
        });
      }
    });
  }

  render() {
    console.log(this.props.userId, 'props userid');

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
          <div className="form-container-outer">
            <div className="form-container">
              <form onSubmit={this.handleSubmit}>
                <div className="form-description">
                  Enter a Transaction in the form below to see it on your
                  transaction record and to see a sum of your earnings/losses on
                  the homepage summary
                </div>
                <div className="form-group">
                  <select
                    value={this.state.selectValue}
                    onChange={this.handleDropdownChange}
                    name="crypto_id"
                    className="form-control"
                  >
                    <option name="default" value="default">
                      Select a Currency
                    </option>
                    {this.props.currencies.map((currencies, i) => {
                      return (
                        <option value={currencies.id} key={currencies.id}>
                          {currencies.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    onChange={this.handleChangeEvent}
                    placeholder="Coins Purchased"
                    name="coin_purchased"
                    value={this.state.coin_purchased}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    onChange={this.handleChangeEvent}
                    placeholder="Amount Invested (USD)"
                    name="usd_invested"
                    value={this.state.usd_invested}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Date/Time Purchased</label>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    showTimeSelect
                    timeIntervals={30}
                    dateFormat="LLL"
                    className="form-control"
                  />
                </div>
                <div>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Enter Transaction"
                  />
                </div>
              </form>
            </div>
            <div className="form-container">
              <div className="form-description">
                Use this form to look up a historical exchange rate for any
                crypto currency and any date. This form doesn't add anything to
                your transaction record.
              </div>
              <form onSubmit={this.findExchange}>
                <div className="form-group">
                  <select
                    value={this.state.selectValue}
                    onChange={this.handleDropdownChange}
                    name="crypto_id"
                    className="form-control"
                  >
                    <option name="default" value="default">
                      Select a Currency
                    </option>
                    {this.props.currencies.map((currencies, i) => {
                      return (
                        <option value={currencies.symbol} key={currencies.id}>
                          {currencies.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="LLL"
                    className="form-control"
                  />
                </div>
                <div className="form group">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Find Historical Exchange"
                  />
                </div>
              </form>
              <div className="historical-exchange-container">
                {!this.state.hist_exchange ? (
                  <div />
                ) : (
                  <div>
                    <div>Crypto Currency: {this.state.hist_symbol}</div>
                    <div>Exchange Rate to USD: {this.state.hist_exchange}</div>
                    <div>
                      Timestamp:{' '}
                      {moment(this.state.hist_timestamp)
                        .format('MMM DD, YYYY H:m')
                        .toString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvestmentForm;
