import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCognitoUser } from '../redux/auth';

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.userIsLoggedIn
  };
}

export class AuthWrapper extends React.Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return <div>{React.cloneElement(this.props.children)}</div>;
  }
}

export default connect(mapStateToProps, {
  getCognitoUser
})(AuthWrapper);
