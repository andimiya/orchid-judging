import React from 'react';
import {
  COINMARKET_API,
  USERS,
  CRYPTO_TYPES,
  CRYPTO_TYPES_SUM
 } from '../../constants';
import { ajax } from 'jquery';
import moment from 'moment';
import { Link } from 'react-router-dom';
// import InvestmentForm from '../../components/InvestmentForm';

const BTCIcon = require('../../assets/bitcoinIcon.svg');
const LTCIcon = require('../../assets/litecoinIcon.svg');
const ETHIcon = require('../../assets/ethereumIcon.svg');

const icons = {
  BTCIcon: BTCIcon,
  LTCIcon: LTCIcon,
  ETHIcon: ETHIcon
};

const USER_ID = 1;

class HomepageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.generateCards = this.generateCards.bind(this);
    this.getTransactionSums = this.getTransactionSums.bind(this);
    this.getExchangeRates = this.getExchangeRates.bind(this);

    this.state = {
      cryptoTypes: [],
      transactionSums: [],
      exchangeRates: [],
      error: ''
    };
  }

  componentDidMount(){
    this.generateCards();
    this.getTransactionSums();
    this.getExchangeRates();
  }

  generateCards(){
    ajax(`${CRYPTO_TYPES}?user_id=${USER_ID}`).then(cryptoTypes => {
      cryptoTypes.data.map((crypto) => {
        ajax(`${COINMARKET_API}${crypto.name}`).then(exchangeRates => {
          console.log(exchangeRates, 'exchange rates generate');
        });
      })
      this.setState({ cryptoTypes: cryptoTypes.data });
    })
  }

  getTransactionSums(){
    ajax(`${CRYPTO_TYPES_SUM}?user_id=${USER_ID}`).then(transactionSums => {
      this.setState({ transactionSums: transactionSums.data })
    });
  }

  getExchangeRates(){
    ajax(`${COINMARKET_API}`).then(exchangeRates => {
      this.setState({ exchangeRates })
    });
  }

  render(props) {
    console.log(this.state.exchangeRates, 'exchange rates');
    return (
      <div className="crypto-container outer">
        {this.state.cryptoTypes.map(currencies => {
          let icon = icons[`${currencies.symbol}Icon`];
          console.log(this.state.exchangeRates[0].name, 'name');

          return (
            <div key={currencies.id} className="crypto-set">
              <div className="title-container">
                <img className="image" src={icon} height="80px" alt="currency symbol" />
                <h2>{currencies.name}</h2>
              </div>
              <div className="data-container">
                {this.state.transactionSums.map(sums => {
                  if (currencies.id === sums.crypto_id) {
                    return (
                      <div key={sums.crypto_id}>
                        <div>USD Invested: ${sums.usd_invested}</div>
                        <div>Coins Owned: {sums.coin_purchased} {currencies.name}</div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  };
};

export default HomepageContainer;
