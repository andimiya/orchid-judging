import React, { Component } from 'react';
import CreateAccountForm from '../../components/CreateAccountForm';

class CreateAccountContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="create-account-container">
        <div className="create-account-container-inner">
          <CreateAccountForm />
        </div>
      </div>
    );
  }
}

export default CreateAccountContainer;
