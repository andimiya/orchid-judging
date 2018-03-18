import React from 'react';
import { ajax } from 'jquery';
import { CURRENCIES } from '../../constants';
import InvestmentForm from '../../components/InvestmentForm';

class NewInvestmentsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.getAllCurrencies = this.getAllCurrencies.bind(this);

    this.state = {
      currencies: []
    };
  }

  componentDidMount() {
    this.getAllCurrencies();
  }

  getAllCurrencies() {
    ajax(CURRENCIES).then(currencies => {
      this.setState({
        currencies: currencies.data
      });
    });
  }

  render(props) {
    return (
      <div className="crypto-container">
        <InvestmentForm currencies={this.state.currencies} />
      </div>
    );
  }
}

export default NewInvestmentsContainer;
