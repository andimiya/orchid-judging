import React from 'react';
import {
  COINMARKET_API,
  CRYPTO_API_GET_INVESTEDCURRENCIES,
  CRYPTO_API_GET_TOTALCOIN,
  CRYPTO_API_GET_INVESTMENTS } from '../../constants';
import { ajax } from 'jquery';
import moment from 'moment';
import { Link } from 'react-router-dom';
import InvestmentForm from '../../components/InvestmentForm';

const BTCIcon = require('../../assets/bitcoinIcon.svg');
const LTCIcon = require('../../assets/litecoinIcon.svg');
const ETHIcon = require('../../assets/ethereumIcon.svg');

const icons = {
  BTCIcon: BTCIcon,
  LTCIcon: LTCIcon,
  ETHIcon: ETHIcon
};

class HomepageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.getAllRates = this.getAllRates.bind(this);
    this.getTotalCoinOwned = this.getTotalCoinOwned.bind(this);
    this.getTotalDollarsInvested = this.getTotalDollarsInvested.bind(this);
    this.getInvestedCurrencies = this.getInvestedCurrencies.bind(this);

    this.state = {
      allData: [],
      filteredData: [],
      investedCurrencies: [],
      calculated: [],
      btcInvested: '',
      calculatedBtc: [],
      btcOwned: '',
      ltcInvested: 600,
      ltcOwned: 10.6864541,
      ethInvested: 500,
      ethOwned: 1.633243136699,
      valueOfBitcoin: '',
      error: ''
    };
  }

  componentDidMount(){
    this.getInvestedCurrencies();
    this.getAllRates();
    this.getTotalCoinOwned();
    this.getTotalDollarsInvested();
  }

  getInvestedCurrencies() {
    ajax(CRYPTO_API_GET_INVESTEDCURRENCIES).then(investedCurrencies => {
      console.log(investedCurrencies, 'invested currencies');
      this.setState({ investedCurrencies: investedCurrencies })
    })
  }

  getAllRates() {
    ajax(COINMARKET_API).then(data => {
      const cryptoArray = data;
      const finalResult = cryptoArray.filter((obj) => {
        if (obj.symbol === 'BTC' || obj.symbol === 'ETH' || obj.symbol === 'LTC') {
          return true;
        }
        return false;
      });
      this.setState({ allData: data})
      finalResult.map(index => {
        return this.setState({
          filteredData: finalResult
        })
      })
    })
    .catch (err => {
      this.setState({ error: 'Coinmarket API error'})
    })
  }

  getTotalCoinOwned(){
    ajax(CRYPTO_API_GET_TOTALCOIN).then(data => {
      const btcAmount = data.filter((obj) => {
        if (obj.currency === 'btc') {
          return true;
        }
        else {
          this.setState({ error: 'Error in getTotalCoinOwned function' })
          return false;
        }
      });
      let btcOwned = btcAmount.reduce((total, item) => total + Number(item.coinowned), 0);
      this.setState({ btcOwned: btcOwned })
    })
  }

  getTotalDollarsInvested(){
    ajax(CRYPTO_API_GET_INVESTMENTS).then(data => {
      const dollarAmountbtc = data.filter((obj) => {
        if (obj.currency === 'BTC') {
          return true;
        } else {
          this.setState({ error: 'Error in getTotalDollarsInvested function' })
          return false;
        }
      });
      let btcInvested = dollarAmountbtc.reduce((total, item) => total + Number(item.amountusd), 0);
      this.setState({ btcInvested: btcInvested.toFixed(2) })
    })
  }

  render(props) {
    return (
      <div className="crypto-container outer">
        {this.state.filteredData.map((cryptoData, i) => {
          const cryptoOwned = this.state[`${cryptoData.symbol.toLowerCase()}Owned`];
          const currentValue = (cryptoOwned*cryptoData.price_usd).toFixed(2);
          const amountInvested = this.state[`${cryptoData.symbol.toLowerCase()}Invested`];
          let icon = icons[`${cryptoData.symbol}Icon`];
          return (
            <div key={cryptoData.id} className="crypto-set">
              <Link to="/transactions">
              <div className="title-container">
                <img className="image" src={icon} height="80px" alt="currency symbol" />
                <h2>{cryptoData.name}</h2>
              </div>
              <div className="data-container">
                <div>Current Market Price (USD): ${cryptoData.price_usd}</div>
                <div>BTC Owned: {this.state.btcOwned.toFixed(4)}</div>
                <div>Amount Invested: ${amountInvested}</div>
                <div>My Coin's Current Value (USD): ${currentValue}</div>
              </div>
              <div className="subtext">Last Updated:  {moment.unix(cryptoData.last_updated).format('MMM DD, YYYY - hh:mm a')}</div>
              </Link>
            </div>
          )
        })}
        <InvestmentForm
          currencies={this.state.allData} />
      </div>
    )
  };
};

export default HomepageContainer;
