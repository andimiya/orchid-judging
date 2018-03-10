import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../../components/Page';
import CreateAccountForm from '../../components/CreateAccountForm';
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
      emailAddress: '',
      firstName: '',
      lastName: '',
      password: '',
      sentStatus: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: this.state.emailAddress,
      password: this.state.password,
      first_name: this.state.firstName,
      last_name: this.state.lastName
    };
    $.post({
      url: CREATE_NEW_USER,
      data: data
    })
    .then(data => {
      if (data.status === 200) {
        this.setState({
          sentStatus: 'sent',
          emailAddress: '',
          firstName: '',
          lastName: '',
          password: ''
        });
      } else {
        this.setState({
          sentStatus: 'error',
        });
      }
    })
    .catch(() => this.setState({ sentStatus: 'error' }));
  }

  render() {
    const { isLoading } = this.state;
    return (
      <Page title="Create a new account">
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
