import React from 'react';
import GridTile from '../../components/GridTile';
import { BTCAPI } from '../../constants';
import { ajax } from 'jquery';
import moment from 'moment';


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
      let date = new Date(JSON.parse(btc).time.updated);

      this.setState ({
        btcRateData: JSON.parse(btc),
        lastUpdated: date.toString(),
        btcRate: JSON.parse(btc).bpi.USD.rate,
      });
    })
  }

  render(props) {
    console.log(this.state.lastUpdated);
    return (
      <div className="btc-container outer">
        <div className="last-updated">
          <p>Last Updated: {moment(this.state.lastUpdated).format('MMMM Do YYYY, h:mm a')}</p>
        </div>
        <div className="btc-rate">
          <p>Current Bitcoin Rate: {this.state.btcRate}</p>
        </div>
      </div>
    )
  };
};

export default WorkContainer;
