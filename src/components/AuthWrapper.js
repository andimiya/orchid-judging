import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getCognitoUser,
  verifyUserLoggedIn,
  getDatabaseUserInfo
} from '../redux/auth';

function mapStateToProps(state) {
  console.log(state.auth, 'auth state');
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
        console.log('sanity');
        getDatabaseUserInfo();
      })
      .catch(err => {
        this.setState({ errorMessage: err });
      });
  }

  render() {
    console.log(this.props, 'props from AuthWrapper');

    const { cognitoUser, userIsLoggedIn, getDatabaseUserInfo } = this.props;

    return <div className="page__content">{this.props.children}</div>;
  }
}

export default connect(mapStateToProps, {
  getCognitoUser,
  verifyUserLoggedIn,
  getDatabaseUserInfo
})(AuthWrapper);
