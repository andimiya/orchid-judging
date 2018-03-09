import React, { Component } from 'react';
import Page from '../components/Page';
import CognitoService from '../cognito';
import { Link } from 'react-router';

class UserConfirmedContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successMessage: false,
      error: null,
    };
  }
  componentDidMount() {
    const { email, verificationCode } = this.props.params;
    if (!verificationCode) {
      return this.context.router.push('/');
    }
    CognitoService.confirmUser(email, verificationCode)
      .then(result => {
        this.setState({ successMessage: 'Your account has been confirmed!' });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  }
  render() {
    return (
      <Page>
        <div className="confirmed__container">
          <h1 className="section__title">Account Confirmed!</h1>
          {this.state.error && <div>{this.state.error}</div>}
          {this.state.successMessage && (
            <div>
              {this.state.successMessage}
              <Link className="link" to="/login">Click here to Log In</Link>
            </div>
          )}
        </div>
      </Page>
    );
  }
}

export default UserConfirmedContainer;
