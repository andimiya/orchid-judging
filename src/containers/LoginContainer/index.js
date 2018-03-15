import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../../components/Page';
import { Link } from 'react-router-dom';
import { authenticateCognitoUser, getCognitoUser } from '../../redux/auth';

import { validators } from '../../utils';

function mapStateToProps(state) {
  return state;
}

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
      password: userPassword,
    };
    return this.props
      .authenticateCognitoUser(credentials)
      .then(result => {
        this.props.history.push('/transactions')
      })
      .catch(err => {
        this.setState({ error: err.message });
      })
  };

  render() {
    return (
      <Page>
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
              <input
                className="btn btn-primary"
                type="submit"
                value="Log In"
              />
            </div>
          </form>
        </div>
      </Page>
    );
  }
}

export default connect(mapStateToProps, {
  authenticateCognitoUser,
  getCognitoUser,
})(LoginContainer);
