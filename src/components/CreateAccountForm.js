import React, { Component } from 'react';
import $ from 'jquery';
import { CREATE_NEW_USER } from '../constants';
import Notice from './Notice';

class CreateAccountForm extends Component {
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
    return (
      <div className="login-form-container">
        <div className="form-container">
          {(() => {
            switch (this.state.sentStatus) {
              case 'sent':
                return (
                  <Notice
                    status="Success! Account Has Been Created"
                    statusClass="success-message"
                    noticeContainerClass="notice-container-success"
                  />
                );
              case 'error':
                return (
                  <Notice
                    status="An error occured, please try again"
                    noticeContainerClass="notice-container-error"
                    statusClass="error-message"
                  />
                );
              default:
                return '';
            }
          })()}
          <div className="form-container">
            <form onSubmit={this.handleSubmit}
              className="form-inline">
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="First Name"
                name="firstName"
                value={this.state.firstName}
                className="form-control"
              />
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Last Name"
                name="lastName"
                value={this.state.lastName}
                className="form-control"
              />
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Email Address"
                name="emailAddress"
                value={this.state.emailAddress}
                className="form-control"
              />
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Password"
                name="password"
                value={this.state.password}
                className="form-control"
              />
              <input
                className="btn btn-primary"
                type="submit"
                value="Create Account"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccountForm;
