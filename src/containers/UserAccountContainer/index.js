import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../components/Page';
import UserAccountForm from '../components/UserAccountForm';
import {
  updateCognitoUser,
  getCognitoUser,
  updateCognitoUserPassword,
} from '../redux/auth';
import { validators } from '../utils';

function mapStateToProps(state) {
  return {
    userInformation: state.auth.userInformation,
    userIsLoggedIn: state.auth.userIsLoggedIn,
  };
}

const editableReset = {
  firstName: false,
  email: false,
};

class UserAccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      accountUpdated: false,
      accountForm: {
        email: '',
        firstName: '',
      },
      editable: {
        firstName: false,
        email: false,
      },
    };
  }

  componentDidMount() {
    this.props
      .getCognitoUser()
      .then(userInfo => {
        return this.setState({
          accountForm: { email: userInfo.email, firstName: userInfo.name },
        });
      })
      .catch(err => {
        return this.setState({ error: err.message });
      });
  }

  makeEditable = e => {
    e.preventDefault();

    const key = e.target.name;

    return this.setState({
      editable: { ...this.state.editable, [key]: true },
    });
  };

  updateUserPassword = (passwordOne, passwordTwo, currentPassword) => {
    if (passwordOne !== passwordTwo) {
      return this.setState({ error: 'Passwords must match' });
    }
    if (!currentPassword) {
      return this.setState({
        error: 'You must enter your current password to change it',
      });
    }

    this.props
      .updateCognitoUserPassword(currentPassword, passwordOne)
      .then(result => {
        this.setState({ accountUpdated: true, editable: editableReset });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  updateUserAccount = (email, firstName) => {
    const { isValidEmail } = validators;

    let userAttributes = [];
    if (email) {
      if (!isValidEmail(email)) {
        return this.setState({ error: 'Please Provide A Valid Email' });
      }
      userAttributes = [...userAttributes, { Name: 'email', Value: email }];
    }
    if (firstName) {
      userAttributes = [...userAttributes, { Name: 'name', Value: firstName }];
    }
    this.props
      .updateCognitoUser(userAttributes)
      .then(result => {
        this.setState({ accountUpdated: true, editable: editableReset });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  handleUserUpdate = e => {
    e.preventDefault();
    this.setState({ error: null });

    const {
      email,
      firstName,
      passwordOne,
      passwordTwo,
      currentPassword,
    } = e.target;
    const newPassword = passwordOne.value;
    const retypedPassword = passwordTwo.value;
    const userEmail = email.value.toLowerCase();
    const userName = firstName.value;

    // Reset Password
    if (newPassword || retypedPassword) {
      this.updateUserPassword(
        newPassword,
        retypedPassword,
        currentPassword.value,
      );
    }

    // Update account information
    if (userEmail || userName) {
      this.updateUserAccount(userEmail, userName);
    }
  };

  onInputChange = e => {
    e.preventDefault();

    this.setState({
      accountForm: {
        ...this.state.accountForm,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const { userIsLoggedIn } = this.props;
    const { email, firstName } = this.state.accountForm;
    return (
      <Page title="My account">
        <div className="account__container">
          {userIsLoggedIn && (
            <UserAccountForm
              error={this.state.error}
              makeEditable={this.makeEditable}
              onInputChange={this.onInputChange}
              handleUserUpdate={this.handleUserUpdate}
              editable={this.state.editable}
              firstName={firstName}
              email={email}
              accountUpdated={this.state.accountUpdated}
            />
          )}
        </div>
      </Page>
    );
  }
}

export default connect(mapStateToProps, {
  updateCognitoUser,
  getCognitoUser,
  updateCognitoUserPassword,
})(UserAccountContainer);
