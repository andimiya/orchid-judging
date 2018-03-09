import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../components/Page';
import { resetUserPassword } from '../redux/auth';

function mapStateToProps(state) {
  return {
    state,
  };
}

class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
    };
  }

  passwordsMatch = (passwordOne, passwordTwo) => {
    return passwordOne === passwordTwo;
  };

  handlePasswordReset = e => {
    e.preventDefault();
    this.setState({ error: null, isLoading: true }, () => {
      const { params: { email }, resetUserPassword } = this.props;
      const { verificationCode, passwordOne, passwordTwo } = e.target;

      if (!this.passwordsMatch(passwordOne.value, passwordTwo.value)) {
        return this.setState({
          error: 'Passwords must match',
          isLoading: false,
        });
      }

      return resetUserPassword(email, verificationCode.value, passwordOne.value)
        .then(result => {
          this.context.router.push('/login');
        })
        .catch(err => {
          this.setState({ error: err.message, isLoading: false });
        });
    });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Page isLoading={isLoading}>
        <h1 className="section__title">Reset Your Password</h1>
        <p className="forgot-password__instructions">
          Enter your new password below.
        </p>
        <p className="forgot-password__subtext">Passwords must be at least 8 characters long and contain both upper and lowercase letters.</p>
        <div className="password-reset__form">
          <form onsubmit={this.handlePasswordReset}>
            <label className="form__field">
              <span className="form__label-text">New Password</span>
              <input
                className="form__input"
                name="passwordOne"
                type="password"
                required
              />
            </label>
            <label className="form__field">
              <span className="form__label-text">Retype Password</span>
              <input
                className="form__input"
                name="passwordTwo"
                type="password"
                required
              />
            </label>
            {this.state.error && (
              <p className="form__error">{this.state.error}</p>
            )}
            <input
              name="verificationCode"
              type="hidden"
              value={this.props.params.verificationCode}
              required
            />
            <button className="button button--form" type="submit">
              Confirm New Password
            </button>
          </form>
        </div>
      </Page>
    );
  }
}

export default connect(mapStateToProps, { resetUserPassword })(ResetPasswordContainer);
