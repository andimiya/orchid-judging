import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Page from '../../components/Page';
import CreateAccountForm from '../../components/CreateAccountForm';
import { CREATE_NEW_USER } from '../../constants';
import { registerCognitoUser } from '../../redux/auth';
import { validators } from '../../utils';

function mapStateToProps(state) {
  return {
    state,
  };
}

class CreateAccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      userAddedSuccessfully: false,
      successfullyCreatedUser: false
    };    
  }

  passwordsMatch = (passwordOne, passwordTwo) => {
    return passwordOne.value === passwordTwo.value;
  };
  

  handleRegistration = e => {
    e.preventDefault();

    const { isValidEmail } = validators;
    const { email, firstName, passwordOne, passwordTwo } = e.target;

    const userInformation = {
      email: email.value.toLowerCase(),
      password: passwordOne.value,
      firstName: firstName.value
    };
          
    return this.props
      .registerCognitoUser(userInformation)
      .then(() => {
        this.setState({ 
          successfullyCreatedUser: true, 
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ error: err.message, isLoading: false });
      })
      .then(() => {
        $.post({
          url: CREATE_NEW_USER,
          data: {
            first_name: userInformation.firstName,
            email: userInformation.email
          }
        })
          .then(data => {
            if (data.status === 200) {
              this.setState({
                userAddedSuccessfully: true
              });
            } else {
              this.setState({ sentStatus: 'error' });
            }
          })
          .catch(() => this.setState({ sentStatus: 'error' }));
      })
  };

  render() {
    return (
      <Page>
        <div className="register__container">
          {this.state.successfullyCreatedUser ? (
            <div className="register__success">
              <h4 className="section__title">Your Account Has Been Created!</h4>
              <p className="register__instructions">
                Check your email for a link we sent to verify your
                account&mdash;
              </p>
              <div className="register__details">
                <span>Once your account is verified you can use the app</span>
              </div>
              <p className="register__action-text">
                Check Your Email to Activate Your Account
              </p>
            </div>
          ) : (
            <div>
              <CreateAccountForm
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

export default connect(mapStateToProps, { registerCognitoUser })(CreateAccountContainer);
