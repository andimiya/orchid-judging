import React, { Component } from 'react';
import AuthWrapper from '../../components/AuthWrapper';
import { Link } from 'react-router-dom';

import { validators } from '../../utils';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
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
      password: userPassword
    };
    return this.props
      .authenticateCognitoUser(credentials)
      .then(result => {
        this.props.history.push('/transactions');
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  render() {
    return (
      <AuthWrapper>
        <div className="outer">
          <h1>Log In to Your Account</h1>
          <div className="form__error">
            {this.state.error && <p>{this.state.error}</p>}
          </div>
          <form onSubmit={this.handleLogin}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input className="btn btn-primary" type="submit" value="Log In" />
            </div>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default LoginContainer;
