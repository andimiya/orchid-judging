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
    return ajax(COINMARKET_API).then(data => {
      this.setState ({
        allData: data,
      });
    })
  }

  render(props) {
    const cryptoArray = this.state.allData;
    const finalResult = cryptoArray.filter((obj) => {
      if (obj.symbol === 'BTC' || obj.symbol === 'ETH') {
        return true;
      }
      return false;
    });
    this.setState({ filteredData: finalResult })
    console.log(finalResult, 'cryptoArray');
    return (
      <div>Test</div>
    )
  };
};

export default HomepageContainer;
