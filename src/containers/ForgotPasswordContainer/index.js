import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import EmailSentIcon from '../assets/images/email-sent-icon';
import Page from '../components/Page';
import { emailResetPasswordCode } from '../redux/auth';

function mapStateToProps(state) {
  return state;
}

class ForgotPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resetCodeSent: false,
      error: null,
      userEmail: null,
    };
  }

  sendResetCode = e => {
    e.preventDefault();

    const email = e.target.email.value;

    return this.props
      .emailResetPasswordCode(email)
      .then(({ data, resendEmail }) => {
        this.setState({ resetCodeSent: true, userEmail: email, resendEmail });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  renderBody = () => {
    const { resetCodeSent, userEmail, error, resendEmail } = this.state;
    if (resetCodeSent) {
      return (
        <div className="forgot-password__form">
          <div className="forgot-password__sent-message">
            <EmailSentIcon className="forgot-password__sent-icon" />
            {resendEmail ? (
              <p className="forgot-password__sent-text">
                Your account has not yet been confirmed. A confirmation email to
                verify your account has been sent to
              </p>
            ) : (
              <p className="forgot-password__sent-text">
                An email with a password reset code has been sent to
              </p>
            )}
          </div>
          <span className="forgot-password__sent-email">{userEmail}</span>
        </div>
      );
    }
    return (
      <div className="forgot-password__form">
        <p className="forgot-password__instructions">
          We’ll send a code for you to reset your password to the email below
        </p>
        <form onsubmit={this.sendResetCode}>
          <label className="form__field">
            <span className="form__label-text">Email Address</span>
            <input className="form__input" name="email" type="text" />
            {error && <div className="form__error">{error}</div>}
          </label>
          <button className="button button--form" type="submit">
            Reset My Password
          </button>
        </form>
        <Link className="link" to="/login">
          &larr; Back To Login
        </Link>
      </div>
    );
  };

  render() {
    return (
      <Page>
        <div>
          <h1 className="section__title">Forgot Your Password?</h1>
          {this.renderBody()}
        </div>
      </Page>
    );
  }
}

export default connect(mapStateToProps, { emailResetPasswordCode })(
  ForgotPasswordContainer
);
