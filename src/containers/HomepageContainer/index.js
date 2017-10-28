import React from 'react';
import {
  COINMARKET_API,
  USERS,
  CRYPTO_TYPES,
  GET_TRANSACTIONS,
  POST_TRANSACTIONS
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

class HomepageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.generateCards = this.generateCards.bind(this);
    // this.getInvestedCurrencies = this.getInvestedCurrencies.bind(this);
    // this.getAllInvestments = this.getAllInvestments.bind(this);
    // this.getTotalCoinOwned = this.getTotalCoinOwned.bind(this);
    // this.getTotalDollarsInvested = this.getTotalDollarsInvested.bind(this);

    this.state = {
      cryptoTypes: [],
      error: ''
    };
  }

  componentDidMount(){
    this.generateCards();
    // this.getAllRates();
    // this.getTotalCoinOwned();
    // this.getTotalDollarsInvested();
  }

  generateCards(){
    ajax(`${CRYPTO_TYPES}?user_id=1`).then(cryptoTypes => {
      console.log(cryptoTypes, 'currencies');
      this.setState({ cryptoTypes: cryptoTypes.data });
    })
  }

  getTransactions(){

  }
  
  //
  // getInvestedCurrencies() {
  //   ajax(CRYPTO_API_GET_INVESTEDCURRENCIES).then(investedCurrencies => {
  //     console.log(investedCurrencies, 'invested currencies');
  //     this.setState({ investedCurrencies: investedCurrencies })
  //   })
  // }
  //
  // getAllInvestments(){
  //   ajax(CRYPTO_API_GET_INVESTMENTS).then(data => {
  //     console.log(data, 'all investements');
  //   })
  // }

  render(props) {
    return (
      <div className="crypto-container outer">
        {this.state.cryptoTypes.map(currencies => {
          let icon = icons[`${currencies.symbol}Icon`];
          return (
            <div key={currencies.id} className="crypto-set">
              <div className="title-container">
                <img className="image" src={icon} height="80px" alt="currency symbol" />
                <h2>{currencies.name}</h2>
              </div>
              <div className="data-container">

              </div>
            </div>
          )
        })}
      </div>
    )
  };
};

export default HomepageContainer;
//
// {this.state.filteredData.map((cryptoData, i) => {
//   const cryptoOwned = this.state[`${cryptoData.symbol.toLowerCase()}Owned`];
//   const currentValue = (cryptoOwned*cryptoData.price_usd).toFixed(2);
// i          let icon = icons[`${cryptoData.symbol}Icon`];
//   return (
//     <div key={cryptoData.id} className="crypto-set">
//       <Link to="/transactions">
//       <div className="title-container">
//         <img className="image" src={icon} height="80px" alt="currency symbol" />
//         <h2>{cryptoData.name}</h2>
//       </div>
//       <div className="data-container">
//         <div>Current Market Price (USD): ${cryptoData.price_usd}</div>
//         <div>BTC Owned: {this.state.btcOwned.toFixed(4)}</div>
//         <div>Amount Invested: ${amountInvested}</div>
//         <div>My Coin's Current Value (USD): ${currentValue}</div>
//       </div>
//       <div className="subtext">Last Updated:  {moment.unix(cryptoData.last_updated).format('MMM DD, YYYY - hh:mm a')}</div>
//       </Link>
//     </div>
//   )
// })}
