import React, { Component } from 'react';
import Page from '../../components/Page';
import { connect } from 'react-redux';
import { getCognitoUser } from '../../redux/auth';

import {
  USERS,
  COINMARKET_API,
  CURRENCIES,
  CRYPTO_TYPES,
  CRYPTO_TYPES_SUM
} from '../../constants';

import { ajax } from 'jquery';
import InvestmentForm from '../../components/InvestmentForm';

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
    isLoggedIn: state.auth.userIsLoggedIn,
    userInformation: state.auth.userInformation
  };
}

class HomepageContainer extends Component {
  constructor(props) {
    super(props);

    this.getUserId = this.getUserId.bind(this);
    this.generateCards = this.generateCards.bind(this);
    this.getTransactionSums = this.getTransactionSums.bind(this);
    this.getAllCurrencies = this.getAllCurrencies.bind(this);

    this.state = {
      cryptoTypes: [],
      transactionSums: [],
      exchangeRates: [],
      currencies: [],
      user_id: null,
      error: ''
    };
  }

  componentDidMount() {
    this.getUserId();
    this.getAllCurrencies();
    this.getTransactionSums();
  }

  getUserId() {
    let user_email = this.props.userInformation.email;
    ajax(`${USERS}?email=${user_email}`).then(cryptoTypes => {
      this.setState({ user_id: cryptoTypes.data[0].id }, this.generateCards);
    });
  }

  generateCards() {
    let user_id = this.state.user_id;
    ajax(`${CRYPTO_TYPES}?user_id=${user_id}`).then(cryptoTypes => {
      ajax(`${COINMARKET_API}`).then(exchangeRates => {
        return this.setState({ exchangeRates: exchangeRates });
      });
      this.setState({
        error: 'Error returning exchange rates from Coinmarket API'
      });
      this.setState({ cryptoTypes: cryptoTypes.data });
    });
  }

  getAllCurrencies() {
    ajax(CURRENCIES).then(currencies => {
      this.setState({
        currencies: currencies.data
      });
    });
  }

  getTransactionSums() {
    ajax(`${CRYPTO_TYPES_SUM}?user_id=${this.state.user_id}`).then(
      transactionSums => {
        this.setState({
          transactionSums: transactionSums.data
        });
      }
    );
  }

  render(props) {
    return (
      <Page>
        <div className="crypto-container outer">
          {this.state.cryptoTypes.map(currencies => {
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
                  {this.state.exchangeRates.map(exchange => {
                    if (currencies.name !== exchange.name) {
                      return null;
                    }
                    return (
                      <div key={exchange.id}>
                        Current exchange price (USD): {exchange.price_usd}
                      </div>
                    );
                  })}
                  {this.state.transactionSums.map(sums => {
                    if (currencies.name !== sums.name) {
                      return null;
                    }
                    return (
                      <div key={sums.name}>
                        <div>USD Invested: ${sums.usd_invested}</div>
                        <div>
                          Coins Owned: {sums.coin_purchased} {currencies.name}
                        </div>
                        {this.state.exchangeRates.map(exchangeRates => {
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
                                Current Market Price: USD per{' '}
                                {exchangeRates.name}: {exchangeRates.price_usd}
                              </div>
                              <div>
                                Current Value (USD): {currentValue.toFixed(2)}
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
            currencies={this.state.currencies}
            getTransactions={this.generateCards}
            getTransactionSums={this.getTransactionSums}
            userId={this.state.user_id}
          />
        </div>
      </Page>
    );
  }
}

export default connect(mapStateToProps, {
  getCognitoUser
})(HomepageContainer);
