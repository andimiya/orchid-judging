import React, { Component } from 'react';
import { ajax } from 'jquery';
import { connect } from 'react-redux';
import { getDatabaseUserInfo } from '../../redux/auth';
import flowerFormData from '../../data/flowerFormData';

function mapStateToProps(state) {
  return {
    databaseUserInfo: state.auth.userInformation
  };
}

class ScoresheetContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="transaction-container outer">
        <div>
          {flowerFormData.flowers.map((flowerFormData, index) => (
            <div>{flowerFormData.flower}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getDatabaseUserInfo
})(ScoresheetContainer);
