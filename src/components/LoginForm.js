import React, { Component } from 'react';
import $ from 'jquery';
import { LOGIN } from '../constants';
import Notice from './Notice';

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
    const data = {
      username: this.state.emailAddress,
      password: this.state.password
    };
    $.post({
      url: LOGIN,
      data: data
    })
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
        <div className="form-container-outer">
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="emailAddress"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Log In"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
