import React, { Component } from 'react';
import { connect } from 'react-redux';

import InvestmentForm from '../../components/InvestmentForm';

import { getDatabaseUserInfo } from '../../redux/auth';
import { getAllCurrencies, getUsersCryptoTypes } from '../../redux/currencies';
import { getExchangeRates } from '../../redux/exchangeRates';
import { getTransactionSums } from '../../redux/transactions';

const BTCIcon = require('../../assets/bitcoinIcon.svg');
const BCHIcon = require('../../assets/bitcoinIcon.svg');
const LTCIcon = require('../../assets/litecoinIcon.svg');
const ETHIcon = require('../../assets/ethereumIcon.svg');
const XRPIcon = require('../../assets/rippleIcon.svg');
const BCNIcon = require('../../assets/bytecoinIcon.svg');
const DOGEIcon = require('../../assets/dogeIcon.svg');
const genericIcon = require('../../assets/genericIcon.svg');

const icons = {
  BTCIcon: BTCIcon,
  BCHIcon: BCHIcon,
  LTCIcon: LTCIcon,
  ETHIcon: ETHIcon,
  XRPIcon: XRPIcon,
  BCNIcon: BCNIcon,
  DOGEIcon: DOGEIcon,
  genericIcon: genericIcon
};

function mapStateToProps(state) {
  return {
    databaseUserInfo: state.auth.userInformation,
    currencies: state.currencies.currencies,
    exchangeRates: state.exchangeRates.exchangeRates,
    transactionSums: state.transactions.transactionSums,
    cryptoTypes: state.currencies.cryptoTypes
  };
}

class SummaryContainer extends Component {
  constructor(props) {
    super(props);

    this.generateCards = this.generateCards.bind(this);

    this.state = {
      error: ''
    };
  }

  componentDidMount() {
    this.generateCards();
    this.props.getAllCurrencies();
    this.props.getExchangeRates();
  }

  generateCards() {
    this.props
      .getDatabaseUserInfo()
      .then(_ => {
        let user_id = this.props.databaseUserInfo.id;
        this.props
          .getTransactionSums(user_id)
          .then(_ => {
            this.props.getUsersCryptoTypes(user_id);
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    return (
      <div className="crypto-container outer">
        {this.props.cryptoTypes.map(currencies => {
          let icon = icons[`${currencies.symbol}Icon`];
          if (!icon) {
            icon = genericIcon;
          }
          return (
            <div key={currencies.symbol} className="crypto-set">
              <div className="title-container">
                <img
                  className="image"
                  src={icon}
                  height="80px"
                  alt="currency symbol"
                />
                <h2>{currencies.name}</h2>
              </div>
              <div className="data-container">
                {this.props.exchangeRates.map(exchange => {
                  if (currencies.name !== exchange.name) {
                    return null;
                  }
                  return (
                    <div key={exchange.id}>
                      Current exchange price (USD): {exchange.price_usd}
                    </div>
                  );
                })}
                {this.props.transactionSums.map(sums => {
                  if (currencies.name !== sums.name) {
                    return null;
                  }
                  return (
                    <div key={sums.name}>
                      <div>USD Invested: ${sums.usd_invested}</div>
                      <div>
                        Coins Owned: {sums.coin_purchased} {currencies.name}
                      </div>
                      {this.props.exchangeRates.map(exchangeRates => {
                        const currencyNameToLowerCase = currencies.name
                          .replace(/\s+/g, '-')
                          .toLowerCase();
                        const currentValue =
                          sums.coin_purchased * exchangeRates.price_usd;
                        if (currencyNameToLowerCase !== exchangeRates.id) {
                          return null;
                        }
                        return (
                          <div key={exchangeRates.id}>
                            <div>
                              Current Market Price: USD per {exchangeRates.name}:{' '}
                              {exchangeRates.price_usd}
                            </div>
                            <div>
                              Current Value (USD): ${currentValue.toFixed(2)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <InvestmentForm
          currencies={this.props.currencies}
          getTransactions={this.generateCards}
          getTransactionSums={this.props.transactionSums}
          userId={this.props.databaseUserInfo.id}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getDatabaseUserInfo,
  getAllCurrencies,
  getExchangeRates,
  getTransactionSums,
  getUsersCryptoTypes
})(SummaryContainer);
