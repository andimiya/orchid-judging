import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getCognitoUser,
  verifyUserLoggedIn,
  getDatabaseUserInfo
} from '../redux/auth';

function mapStateToProps(state) {
  return {
    cognitoUser: state.auth.cognitoUserInformation,
    userIsLoggedIn: state.auth.userIsLoggedIn,
    databaseUserInfo: state.auth.userInformation
  };
}

class AuthWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null
    };
  }

  componentDidMount() {
    const {
      getCognitoUser,
      verifyUserLoggedIn,
      getDatabaseUserInfo
    } = this.props;
    verifyUserLoggedIn()
      .then(() => {
        getCognitoUser();
      })
      .then(() => {
        getDatabaseUserInfo();
      })
      .catch(err => {
        this.setState({ errorMessage: err });
      });
  }

  render() {
    return <div className="page__content">{this.props.children}</div>;
  }
}

export default connect(mapStateToProps, {
  getCognitoUser,
  verifyUserLoggedIn,
  getDatabaseUserInfo
})(AuthWrapper);
