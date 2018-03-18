import React, { Component } from 'react';
import Editable from './Editable';

class UserAccountForm extends Component {
  render() {
    const {
      error,
      makeEditable,
      editable,
      firstName,
      email,
      accountUpdated,
      handleUserUpdate,
      onInputChange
    } = this.props;
    return (
      <div className="account__form">
        <h1 className="section__title">Account Information</h1>
        <div className="form__error">
          <p>{error}</p>
        </div>
        <form onsubmit={handleUserUpdate}>
          <Editable
            name="email"
            required={true}
            label="Email Address"
            value={email}
            onClick={makeEditable}
            onChange={onInputChange}
            editable={editable.email}
          />
          <Editable
            name="firstName"
            required={true}
            label="Name"
            value={firstName}
            onClick={makeEditable}
            onChange={onInputChange}
            editable={editable.firstName}
          />
          <label className="form__field account-form__field">
            <span className="form__label-text account-form__label-text">
              Current Password
            </span>
            <input
              className="form__input account-form__input"
              name="currentPassword"
              type="password"
              placeholder="Current password"
            />
          </label>
          <label className="form__field account-form__field">
            <span className="form__label-text account-form__label-text">
              New Password<br />
              <span className="form__label-text account-form__subtext">
                Minimum 8 characters, upper and lower case
              </span>
            </span>
            <input
              className="form__input account-form__input"
              name="passwordOne"
              type="password"
              placeholder="New password"
            />
          </label>
          <label className="form__field account-form__field">
            <span className="form__label-text account-form__label-text">
              Retype Password
            </span>
            <input
              className="form__input account-form__input"
              name="passwordTwo"
              type="password"
              placeholder="Retype new password"
            />
          </label>
          {accountUpdated && (
            <div className="account__success-message">
              <p>Account Updated</p>
            </div>
          )}
          <button className="button button--form" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    );
  }
}

export default UserAccountForm;
