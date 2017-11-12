import React from 'react';
import {
  COINMARKET_API,
  CURRENCIES,
  CRYPTO_TYPES,
  CRYPTO_TYPES_SUM
 } from '../../constants';
import { ajax } from 'jquery';
import InvestmentForm from '../../components/InvestmentForm';

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
    this.getAllCurrencies = this.getAllCurrencies.bind(this);

    this.state = {
      cryptoTypes: [],
      transactionSums: [],
      exchangeRates: [],
      currencies: [],
      error: ''
    };
  }

  componentDidMount(){
    this.generateCards();
    this.getAllCurrencies();
    this.getTransactionSums();
  }

  generateCards(){
    ajax(`${CRYPTO_TYPES}?user_id=${USER_ID}`)
      .then(cryptoTypes => {
      cryptoTypes.data.map(crypto => {
        ajax(`${COINMARKET_API}${crypto.name}`)
          .then(exchangeRates => {
            let exchangeRatesArray = this.state.exchangeRates;
            exchangeRatesArray.push(exchangeRates[0]);
            return this.setState({ exchangeRates: exchangeRatesArray })
          });
        return this.setState({ error: 'Error returning exchange rates from Coinmarket API' })
      })
        return this.setState({ cryptoTypes: cryptoTypes.data });
      })
  }

  getAllCurrencies(){
    ajax(CURRENCIES).then(currencies => {
      this.setState({
        currencies: currencies.data
      });
    });
  }

  getTransactionSums(){
    ajax(`${CRYPTO_TYPES_SUM}?user_id=${USER_ID}`)
      .then(transactionSums => {
        this.setState({ transactionSums: transactionSums.data
      })
    });
  }

  render(props) {
    return (
      <div className="crypto-container outer">
        {this.state.cryptoTypes.map(currencies => {
          let icon = icons[`${currencies.symbol}Icon`];
          return (
            <div className="crypto-set">
              <div className="title-container">
                <img className="image" src={icon} height="80px" alt="currency symbol" />
                <h2>{currencies.name}</h2>
              </div>
              <div className="data-container">
                {this.state.exchangeRates.map(exchange => {
                  if (currencies.name === exchange.name) {
                    return (
                      <div>Current exchange price (USD): {exchange.price_usd}</div>
                    )
                  }
                })}
                {this.state.transactionSums.map(sums => {
                  if (currencies.name === sums.name) {
                    return (
                      <div key={sums.crypto_type_id}>
                        <div>USD Invested: ${sums.usd_invested}</div>
                        <div>Coins Owned: {sums.coin_purchased} {currencies.name}</div>
                        {this.state.exchangeRates.map(exchangeRates => {
                          const currentValue = (sums.coin_purchased*exchangeRates.price_usd);
                          if (currencies.name.toLowerCase() === exchangeRates.id) {
                            return (
                              <div key={exchangeRates.id}>
                                <div>Current Market Price: USD per {exchangeRates.name}: {exchangeRates.price_usd}</div>
                                <div>Current Value (USD): {currentValue.toFixed(2)}</div>
                              </div>
                            )
                          }
                        })}
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          )
        })}
        <InvestmentForm
          currencies={this.state.currencies}
          getTransactions={this.generateCards}
        />
      </div>
    )
  };
};

export default HomepageContainer;
