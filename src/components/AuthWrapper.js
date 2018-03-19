import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCognitoUser, verifyUserLoggedIn } from '../redux/auth';

function mapStateToProps(state) {
  return {
    user: state.auth.userInformation,
    userIsLoggedIn: state.auth.userIsLoggedIn
    // databaseUserInfo: state.auth.databaseUserInfo
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
    const { getCognitoUser, verifyUserLoggedIn } = this.props;
    verifyUserLoggedIn()
      .then(() => {
        getCognitoUser();
      })
      .catch(err => {
        this.setState({ errorMessage: err });
      });
  }

  render() {
    console.log(this.props, 'props from AuthWrapper');

    const { user, userIsLoggedIn } = this.props;

    return <div className="page__content">{this.props.children}</div>;
  }
}

export default connect(mapStateToProps, {
  getCognitoUser,
  verifyUserLoggedIn
  // getDatabaseUserInfo
})(AuthWrapper);
