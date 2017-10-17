import React from 'react';
import { COINMARKET_API } from '../../constants';
import { ajax } from 'jquery';
import moment from 'moment';
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

    this.state = {
      allData: [],
      filteredData: [],
      calculated: [],
      btcInvested: 2060,
      calculatedBtc: [],
      btcOwned: 0.37601801,
      ltcInvested: 600,
      ltcOwned: 10.6864541,
      ethInvested: 500,
      ethOwned: 1.633243136699,
      valueOfBitcoin: '',
      error: ''
    };
  }

  componentDidMount(){
    this.getAllRates();
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
      finalResult.map(index => {
        this.setState({
          filteredData: finalResult
        })
      })
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
              <div className="title-container">
                <img className="image" src={icon} height="80px" alt="currency image" />
                <h2>{cryptoData.name}</h2>
              </div>
              <div className="data-container">
                <div>Amount Invested: ${amountInvested}</div>
                <div>Last Updated: {moment.unix(cryptoData.last_updated).format('MMM DD, YYYY - hh:mm a')}</div>
                <div>Current Price: ${cryptoData.price_usd}</div>
                <div>Current Value: ${currentValue}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  };
};

export default HomepageContainer;
