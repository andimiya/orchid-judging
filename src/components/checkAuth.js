import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCognitoUser } from '../redux/auth';

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.userIsLoggedIn
  };
}

class AuthWrapper extends Component {
  componentDidMount() {
    getCognitoUser();
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        {React.cloneElement(this.props.children, {
          isLoggedIn: this.props.isLoggedIn
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getCognitoUser
})(AuthWrapper);
