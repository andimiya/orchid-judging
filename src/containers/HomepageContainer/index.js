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
      lastUpdated: [],
      btcRate: [],
      selectedCrypto: '',
      totalInvested: 2060,
      bitcoinOwned: 0.37601801,
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
      this.setState({ filteredData: finalResult })
    })

  }

  render(props) {
    console.log(this.state.filteredData, 'cryptoArray');
    return (
      <div>
        {this.state.filteredData.map(index => {
          return (
            <div>{index.id}</div>
          )
        })}
      </div>
    )
  };
};

export default HomepageContainer;
