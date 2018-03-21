import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCognitoUser, verifyUserLoggedIn } from '../redux/auth';

function mapStateToProps(state) {
  return {
    user: state.auth.userInformation,
    userIsLoggedIn: state.auth.userIsLoggedIn
  };
}

class CheckAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null
    };
  }

  componentDidMount() {
    const { getCognitoUser, verifyUserLoggedIn } = this.props;
    verifyUserLoggedIn()
      .then(() => {
        getCognitoUser();
      })
      .catch(err => {
        this.setState({ errorMessage: err });
      });
  }

  render() {
    if (!this.props.userIsLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        {React.cloneElement(this.props.children, {
          isLoggedIn: this.props.userIsLoggedIn
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getCognitoUser,
  verifyUserLoggedIn
})(CheckAuth);
