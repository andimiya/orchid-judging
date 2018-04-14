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
      onChange
    } = this.props;
    return (
      <div className="form-group">
        <span className="form__label-text account-form__label-text">
          {label}
        </span>
        {editable ? (
          <input
            className="form__input account-form__input form-control"
            onChange={onChange}
            name={name}
            type="text"
            value={value}
            required={required}
          />
        ) : (
          <div className="form-group account-form__editable-field">
            <span className="account-form__existing-value">{value}</span>
            <button
              className="button--invisible"
              type="submit"
              name={name}
              onClick={onClick}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Editable;
