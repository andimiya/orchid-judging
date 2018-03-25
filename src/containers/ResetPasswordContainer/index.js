import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetUserPassword } from '../../redux/auth';

function mapStateToProps(state) {
  return {
    state
  };
}

class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.passwordsMatch = this.passwordsMatch.bind(this);

    this.state = {
      error: null,
      email: '',
      verificationCode: '',
      passwordOne: '',
      passwordTwo: ''
    };
  }

  passwordsMatch = (passwordOne, passwordTwo) => {
    return passwordOne === passwordTwo;
  };

  handlePasswordReset = e => {
    e.preventDefault();
    this.setState({
      email: e.target.email.value,
      verificationCode: e.target.verificationCode.value,
      passwordOne: e.target.passwordOne.value,
      passwordTwo: e.target.passwordTwo.value
    });

    this.props
      .resetUserPassword(
        e.target.email.value,
        e.target.verificationCode.value,
        e.target.passwordOne.value
      )
      .then(_ => {
        this.props.history.push('/login');
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  render() {
    return (
      <div className="outer">
        <h1>Reset Your Password</h1>
        <p>Enter your new password below.</p>
        <p>
          Passwords must be at least 8 characters long and contain both upper
          and lowercase letters.
        </p>
        <div className="password-reset__form">
          <form onSubmit={this.handlePasswordReset}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                className="form-control"
                name="email"
                type="email"
                required
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                className="form-control"
                name="passwordOne"
                type="password"
                required
              />
            </div>
            <div className="form-group">
              <label>Retype Password</label>
              <input
                className="form-control"
                name="passwordTwo"
                type="password"
                required
              />
            </div>
            {this.state.error && (
              <p className="form__error">{this.state.error}</p>
            )}
            <div className="form-group">
              <label>Verification Code</label>
              <input
                className="form-control"
                name="verificationCode"
                type="number"
                required
              />
            </div>
            <button className="btn" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { resetUserPassword })(
  ResetPasswordContainer
);
