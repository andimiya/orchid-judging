import React, { Component } from 'react';

class Editable extends Component {
  render() {
    const {
      label,
      editable,
      name,
      required,
      value,
      onClick,
      onChange,
    } = this.props;
    return (
      <label className="form__field account-form__field">
        <span className="form__label-text account-form__label-text">
          {label}
        </span>
        {editable ? (
          <input
            className="form__input account-form__input"
            onChange={onChange}
            name={name}
            type="text"
            value={value}
            required={required}
          />
        ) : (
          <div className="account-form__editable-field">
            <span className="account-form__existing-value">{value}</span>
            <button
              className="button--invisible"
              type="secondary"
              name={name}
              onClick={onClick}
            />
          </div>
        )}
      </label>
    );
  }
}

export default Editable;
