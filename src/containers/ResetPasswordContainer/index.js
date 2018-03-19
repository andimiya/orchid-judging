import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthWrapper from '../../components/AuthWrapper';
import { resetUserPassword } from '../../redux/auth';

function mapStateToProps(state) {
  return {
    state
  };
}

class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false
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
          isLoading: false
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
    return (
      <AuthWrapper>
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
      </AuthWrapper>
    );
  }
}

export default connect(mapStateToProps, { resetUserPassword })(
  ResetPasswordContainer
);
