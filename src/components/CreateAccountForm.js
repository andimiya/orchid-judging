import React, { Component } from 'react';

class CreateAccountForm extends Component {
  render() {
    const { handleRegistration } = this.props;
    return (
      <div className="register__form outer" >
        <h1 className="section__title">Create an Account</h1>
        <div className="form__error">
          <p>{this.props.error}</p>
        </div>
        <form onSubmit={handleRegistration}>
          <div className="form-group">
            <input 
              type="text"
              name="email"
              placeholder="Email Address"
              className="form-control"
              required
            />
            <input 
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-control"
              required
            />
            <label>Minimum 8 characters, upper and lower case</label>
            <input 
              type="password"
              name="passwordOne"
              placeholder="Password"
              className="form-control"
              required
            />
            <label>Minimum 8 characters, upper and lower case</label>
            <input 
              type="password"
              name="passwordOne"
              placeholder="Re-enter password"
              className="form-control"
              required
            />
            <button className="button button--form"type="submit">Create Account</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateAccountForm;
