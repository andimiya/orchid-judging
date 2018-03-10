import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import Page from '../../components/Page';
import { Link } from 'react-router-dom';
import { authenticateCognitoUser, getCognitoUser } from '../../redux/auth';

import { validators } from '../../utils';

function mapStateToProps(state) {
  return {
    userInformation: state.auth.userInformation,
  };
}

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleLogin = e => {
    e.preventDefault();
    this.setState({ error: null });

    const { isValidEmail } = validators;
    const { email, password } = e.target;

    const userEmail = email.value.toLowerCase();
    const userPassword = password.value;

    if (!isValidEmail(userEmail)) {
      return this.setState({ error: 'Please Provide A Valid Email' });
    }
    const credentials = {
      userName: userEmail,
      password: userPassword,
    };
    return this.props
      .authenticateCognitoUser(credentials)
      .then(result => {
        this.props.getCognitoUser().then(userInfo => {
          // Set user display name in local storage so it does not have
          // to be fetched every time the user navigates to a new page
          window.localStorage.setItem('manomanoDisplayName', userInfo.name);
          // Redirects user to the home page
          this.context.router.push('/');
        });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  render() {
    return (
      <Page>
        <div className="outer">
          <h1>Log In to Your Account</h1>
          <LoginForm />
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
      </Page>
    );
  }
}

export default connect(mapStateToProps, {
  authenticateCognitoUser,
  getCognitoUser,
})(LoginContainer);
