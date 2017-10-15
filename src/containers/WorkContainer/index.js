import React from 'react';
import GridTile from '../../components/GridTile';
import { BTCAPI } from '../../constants';
import { ajax } from 'jquery';


class WorkContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btcRateData: [],
      lastUpdated: [],
      btcRate: [],
      error: ''
    };
  }

  componentDidMount(){
    return ajax(BTCAPI).then(btc => {
      this.setState ({
        btcRateData: JSON.parse(btc),
        lastUpdated: JSON.parse(btc).time.updated,
        btcRate: JSON.parse(btc).bpi.USD.rate,
      });
    })
  }

  render(props) {
    console.log(this.state.btcRate);
    return (
      <div className="btc-container outer">
        <div className="last-updated">
          Last Updated: {this.state.lastUpdated}
        </div>
        <div className="btc-rate">
          Current Bitcoin Rate: {this.state.btcRate}
        </div>
      </div>
    )
  };
};

export default WorkContainer;
