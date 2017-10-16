import React from 'react';
import { COINMARKET_API } from '../../constants';
import { ajax } from 'jquery';
import moment from 'moment';


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
    console.log(this.state.filteredData, 'cryptoArray');
    console.log(this.state.calculatedBtc, 'calculated btc');
    return (
      <div className="crypto-container outer">
        {this.state.filteredData.map(index => {
          return (
            <div key={index.id} className="crypto-set">
              <div>{index.name}</div>
              <div>Last Updated: {moment.unix(index.last_updated).format('MMM DD, YYYY - hh:mm a')}</div>
              <div>Current Price: ${index.price_usd}</div>
            </div>
          )
        })}
        <div className="invested">
          <div>BTC Invested: ${this.state.btcInvested}</div>
          <div>LTC Invested: ${this.state.ltcInvested}</div>
          <div>ETH Invested: ${this.state.ethInvested}</div>
        </div>
      </div>
    )
  };
};

export default HomepageContainer;
