import React from 'react';
import { CRYPTO_API_TOTALCOIN, CRYPTO_API_INVESTMENTS } from '../../constants';
import { ajax } from 'jquery';
import moment from 'moment';
import InvestmentForm from '../../components/InvestmentForm';
import TransactionTable from '../../components/TransactionTable';

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

    this.getTransactions = this.getTransactions.bind(this);

    this.state = {
      allData: [],
      error: ''
    };
  }

  componentDidMount(){
    this.getTransactions();
  }

  getTransactions(){
    ajax(CRYPTO_API_TOTALCOIN).then(data => {
      console.log(data, 'data');
      this.setState({ allData: data })
    })
  }

  render(props) {
    return (
      <div className="crypto-container outer">
        <TransactionTable
          />
        <InvestmentForm
          currencies={this.state.allData} />
      </div>
    )
  };
};

export default HomepageContainer;
