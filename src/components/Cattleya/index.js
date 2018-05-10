import React, { Component } from 'react';
import FlowerColor from './FlowerColor';

class Cattleya extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="transaction-container outer">
        <div className="investment-form-container-outer">
          <FlowerColor />
        </div>
      </div>
    );
  }
}

export default Cattleya;
