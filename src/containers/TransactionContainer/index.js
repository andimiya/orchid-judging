import React, { Component } from 'react';
import { ajax } from 'jquery';
import { connect } from 'react-redux';
import { getDatabaseUserInfo } from '../../redux/auth';
import Cattleya from '../../components/Cattleya';
import Dendrobium from '../../components/Dendrobium';

function mapStateToProps(state) {
  return {
    databaseUserInfo: state.auth.userInformation
  };
}

class TransactionContainer extends Component {
  constructor(props) {
    super(props);

    this.formSelection = this.formSelection.bind(this);
    this.scoreAdder = this.scoreAdder.bind(this);

    this.state = {
      formSelected: '',
      totalScore: 0,
      error: ''
    };
  }

  formSelection(e) {
    this.setState({ formSelected: e.target.value });
  }

  scoreAdder() {
    let length = document.getElementsByClassName('active').length;
    let totalScore = 0;
    for (let i = 0; i < length; i++) {
      totalScore += parseInt(
        document.getElementsByClassName('active')[i].children[0].value
      );
    }
    return this.setState({ totalScore: totalScore });
  }

  render() {
    return (
      <div className="transaction-container outer">
        <div className="investment-form-container-outer">
          <select
            className="btn btn-secondary"
            name="Flower Type"
            onChange={this.formSelection}
          >
            <option defaultValue="Flower Type">Flower Type</option>
            <option value="cattleya">Cattleya</option>
            <option value="dendrobium">Dendrobium</option>
          </select>
          <br />
          <br />
          {(() => {
            switch (this.state.formSelected) {
              case 'dendrobium':
                return (
                  <Dendrobium
                    scoreAdder={this.scoreAdder}
                    totalScore={this.state.totalScore}
                  />
                );
              case 'cattleya':
                return (
                  <Cattleya
                    scoreAdder={this.scoreAdder}
                    totalScore={this.state.totalScore}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getDatabaseUserInfo
})(TransactionContainer);
