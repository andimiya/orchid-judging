import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../components/Page';
import RegisterUserForm from '../components/RegisterUserForm';
import { registerCognitoUser } from '../redux/auth';
import { validators } from '../utils';

function mapStateToProps(state) {
  return {
    state,
  };
}

class RegisterUserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      successfullyCreatedUser: false,
    };
  }

  passwordsMatch = (passwordOne, passwordTwo) => {
    return passwordOne.value === passwordTwo.value;
  };

  handleRegistration = e => {
    e.preventDefault();
    this.setState({ error: null, isLoading: true }, () => {
      const { isValidEmail } = validators;
      const { email, firstName, school, passwordOne, passwordTwo } = e.target;

      if (!this.passwordsMatch(passwordOne, passwordTwo)) {
        return this.setState({
          error: 'Both Passwords Must Match',
          isLoading: false,
        });
      }
      if (!isValidEmail(email.value)) {
        return this.setState({
          error: 'Please Provide A Valid Email',
          isLoading: false,
        });
      }

      const userInformation = {
        email: email.value.toLowerCase(),
        password: passwordOne.value,
        firstName: firstName.value,
        school: school.value,
      };
      return this.props
        .registerCognitoUser(userInformation)
        .then(() => {
          this.setState({ successfullyCreatedUser: true, isLoading: false });
        })
        .catch(err => {
          this.setState({ error: err.message, isLoading: false });
        });
    });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Page isLoading={isLoading} title="Create a new account">
        <div className="register__container">
          {this.state.successfullyCreatedUser ? (
            <div className="register__success">
              <h4 className="section__title">Ua hoʻokino ʻia kāu moʻokāki<br />Your Account Has Been Created!</h4>
              <p className="register__instructions">
                Check your email for a link we sent to verify your
                account&mdash;
              </p>
              <div className="register__details">
                <span>Once your account is verified you can start</span>
                <ul>
                  <li>&ndash; Creating flashcard decks</li>
                  <li>&ndash; Saving important words</li>
                  <li>
                    &ndash; Practicing and playing through your flashcard decks
                  </li>
                </ul>
              </div>
              <p className="register__action-text">
                Check Your Email to Activate Your Account
              </p>
            </div>
          ) : (
            <div>
              <RegisterUserForm
                handleRegistration={this.handleRegistration}
                error={this.state.error}
              />
            </div>
          )}
        </div>
      </Page>
    );
  }
}

export default connect(mapStateToProps, { registerCognitoUser })(RegisterUserContainer);
