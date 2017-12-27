import React, { Component } from 'react';
import $ from 'jquery';
import Notice from './Notice';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
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
    const options = {
      data: JSON.stringify({
        emailAddress: this.state.emailAddress,
        password: this.state.firstName
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    $.post(options)
      .then(data => {
        if (data.statusCode === 200) {
          this.setState({
            sentStatus: 'sent',
            emailAddress: '',
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
                    status="Your message has been sent! We'll contact you shortly"
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
                value="Log In"
              />
            </form>
          </div>
        </div>
        <Link to="create-account">Create Account</Link>
      </div>
    );
  }
}

export default LoginForm;
