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
            <div key={index.id}>
              <div>{index.name}</div>
              <div>Last Updated: {moment.unix(index.last_updated).format('MMM DD, YYYY - hh:mm a')}</div>
              <div>Current Price: ${index.price_usd}</div>
            </div>
          )
        })}
      </div>
    )
  };
};

export default HomepageContainer;
