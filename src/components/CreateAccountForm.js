import React, { Component } from 'react';

class CreateAccountForm extends Component {
  render() {
    const { handleRegistration } = this.props;
    return (
      <div className="register__form">
        <h1 className="section__title">Account Details</h1>
        <div className="form__error">
          <p>{this.props.error}</p>
        </div>
        <form onSubmit={handleRegistration}>
          <label className="form__field account-form__field">
            <span className="form__label-text account-form__label-text">Email Address</span>
            <input className="form__input account-form__input" name="email" type="text" required />
          </label>
          <label className="form__field account-form__field">
            <span className="form__label-text account-form__label-text">Name</span>
            <input className="form__input account-form__input" name="firstName" type="text" required />
          </label>
          <label className="form__field account-form__field">
            <span className="form__label-text account-form__label-text">Password<br />
              <span className="form__label-text account-form__subtext">Minimum 8 characters, upper and lower case</span>
            </span>
            <input className="form__input account-form__input" name="passwordOne" type="password" required />
          </label>
          <label className="form__field account-form__field">
            <span className="form__label-text account-form__label-text">Retype Password</span>
            <input className="form__input account-form__input" name="passwordTwo" type="password" required />
          </label>
          <button className="button button--form"type="submit">Create Account</button>
        </form>
      </div>
    );
  }
}

export default CreateAccountForm;
