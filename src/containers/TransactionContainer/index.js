import React, { Component } from 'react';
import { ajax } from 'jquery';
import { connect } from 'react-redux';
import { getDatabaseUserInfo } from '../../redux/auth';
import ScoreSheet from '../../components/ScoreSheet';

function mapStateToProps(state) {
  return {
    databaseUserInfo: state.auth.userInformation
  };
}

class TransactionContainer extends Component {
  constructor(props) {
    super(props);

    this.scoreAdder = this.scoreAdder.bind(this);

    this.state = {
      totalScore: 0,
      error: ''
    };
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
          <ScoreSheet
            userId={this.props.databaseUserInfo.id}
            scoreAdder={this.scoreAdder}
            totalScore={this.state.totalScore}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getDatabaseUserInfo
})(TransactionContainer);
