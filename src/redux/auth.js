import { ajax } from 'jquery';
import CognitoService from '../cognito';
import { USERS } from '../constants';

const LOGIN = 'crypto-app/auth/LOGIN';
const LOGIN_SUCCESS = 'crypto-app/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'crypto-app/auth/LOGIN_FAIL';

const LOGOUT = 'crypto-app/auth/LOGOUT';
const LOGOUT_SUCCESS = 'crypto-app/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'crypto-app/auth/LOGOUT_FAIL';

const REGISTER_USER = 'crypto-app/auth/REGISTER_USER';
const REGISTER_USER_SUCCESS = 'crypto-app/auth/REGISTER_USER_SUCCESS';
const REGISTER_USER_FAIL = 'crypto-app/auth/REGISTER_USER_FAIL';

const GET_USER_ATTRIBUTES = 'crypto-app/auth/GET_USER_ATTRIBUTES';
const GET_USER_ATTRIBUTES_SUCCESS =
  'crypto-app/auth/GET_USER_ATTRIBUTES_SUCCESS';
const GET_USER_ATTRIBUTES_FAIL = 'crypto-app/auth/GET_USER_ATTRIBUTES_FAIL';
const GET_DB_USER_ATTRIBUTES_SUCCESS =
  'crypto-app/auth/GET_DB_USER_ATTRIBUTES_SUCCESS';

const UPDATE_USER_ATTRIBUTES = 'crypto-app/auth/UPDATE_USER_ATTRIBUTES';
const UPDATE_USER_ATTRIBUTES_SUCCESS =
  'crypto-app/auth/UPDATE_USER_ATTRIBUTES_SUCCESS';
const UPDATE_USER_ATTRIBUTES_FAIL =
  'crypto-app/auth/UPDATE_USER_ATTRIBUTES_FAIL';

const UPDATE_USER_PASSWORD = 'crypto-app/auth/UPDATE_USER_PASSWORD';
const UPDATE_USER_PASSWORD_SUCCESS =
  'crypto-app/auth/UPDATE_USER_PASSWORD_SUCCESS';
const UPDATE_USER_PASSWORD_FAIL = 'crypto-app/auth/UPDATE_USER_PASSWORD_FAIL';

const SEND_PASSWORD_RESET_CODE = 'crypto-app/auth/SEND_PASSWORD_RESET_CODE';
const SEND_PASSWORD_RESET_CODE_SUCCESS =
  'crypto-app/auth/SEND_PASSWORD_RESET_CODE_SUCCESS';
const SEND_PASSWORD_RESET_CODE_FAIL =
  'crypto-app/auth/SEND_PASSWORD_RESET_CODE_FAIL';

const RESET_PASSWORD = 'crypto-app/auth/RESET_PASSWORD';
const RESET_PASSWORD_SUCCESS = 'crypto-app/auth/RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAIL = 'crypto-app/auth/RESET_PASSWORD_FAIL';

const VERIFY_USER_LOGGED_IN = 'crypto-app/auth/VERIFY_USER_LOGGED_IN';
const VERIFY_USER_LOGGED_IN_SUCCESS =
  'crypto-app/auth/VERIFY_USER_LOGGED_IN_SUCCESS';
const VERIFY_USER_LOGGED_IN_FAIL = 'crypto-app/auth/VERIFY_USER_LOGGED_IN_FAIL';

const initialState = {
  cognitoUserInformation: {
    email: '',
    firstName: ''
  },
  userIsLoggedIn: false,
  userInformation: {
    email: '',
    firstName: '',
    lastName: '',
    userId: ''
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userIsLoggedIn: true
      };
    case LOGOUT_SUCCESS:
      return initialState;
    case UPDATE_USER_ATTRIBUTES_SUCCESS:
      return {
        ...state
      };
    case GET_USER_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        cognitoUserInformation: {
          ...action.cognitoUserInformation
        }
      };
    case GET_DB_USER_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        userInformation: {
          ...action.userInformation
        }
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state
      };
    case VERIFY_USER_LOGGED_IN_SUCCESS:
    case VERIFY_USER_LOGGED_IN_FAIL:
      return {
        ...state,
        userIsLoggedIn: action.loginStatus
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state
      };
    case UPDATE_USER_ATTRIBUTES_FAIL:
    case GET_USER_ATTRIBUTES_FAIL:
    case UPDATE_USER_PASSWORD_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
    case REGISTER_USER_FAIL:
    case RESET_PASSWORD_FAIL:
    case SEND_PASSWORD_RESET_CODE_FAIL:
    default:
      return state;
  }
}

export function loginUser() {
  return {
    type: LOGIN
  };
}

export function updateUserAccount() {
  return {
    type: UPDATE_USER_ATTRIBUTES
  };
}

export function updateUserPassword() {
  return {
    type: UPDATE_USER_PASSWORD
  };
}

export function registerUser() {
  return {
    type: REGISTER_USER
  };
}

export function forgotPassword() {
  return {
    type: SEND_PASSWORD_RESET_CODE
  };
}

export function resetPassword() {
  return {
    type: RESET_PASSWORD
  };
}

export function getAttributes() {
  return {
    type: GET_USER_ATTRIBUTES
  };
}

export function getUserSession() {
  return {
    type: VERIFY_USER_LOGGED_IN
  };
}

export function logoutUser() {
  return {
    type: LOGOUT
  };
}

export function authenticateCognitoUser(credentials) {
  return dispatch => {
    dispatch(loginUser());
    return CognitoService.authenticateUser(credentials)
      .then(result => {
        console.log(result, 'authenticate success result');

        dispatch({ type: LOGIN_SUCCESS, result });
        return result;
      })
      .catch(err => {
        console.log(err, 'authenticate error result');
        throw err;
      });
  };
}

export function updateCognitoUser(userAttributes) {
  return dispatch => {
    dispatch(updateUserAccount());
    return CognitoService.updateUserAttributes(userAttributes)
      .then(result => {
        dispatch({ type: UPDATE_USER_ATTRIBUTES_SUCCESS, result });
        return result;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function getDatabaseUserInfo() {
  let userInformation = null;
  let cognitoEmail = null;
  return dispatch => {
    dispatch(getAttributes());
    return CognitoService.getUserAttributes()
      .then(cognitoUserInformation => {
        cognitoEmail = encodeURIComponent(cognitoUserInformation.email);
      })
      .then(_ => {
        return ajax(`${USERS}?email=${cognitoEmail}`)
          .then(databaseUserInfo => {
            userInformation = databaseUserInfo.data[0];
            dispatch({ type: GET_DB_USER_ATTRIBUTES_SUCCESS, userInformation });
            return userInformation;
          })
          .catch(err => {
            throw err;
          });
      });
  };
}

export function getCognitoUser() {
  return dispatch => {
    dispatch(getAttributes());
    return CognitoService.getUserAttributes()
      .then(cognitoUserInformation => {
        dispatch({ type: GET_USER_ATTRIBUTES_SUCCESS, cognitoUserInformation });
        console.log(cognitoUserInformation, 'cognito user info');
        return cognitoUserInformation;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function updateCognitoUserPassword(currentPassword, newPassword) {
  return dispatch => {
    dispatch(updateUserPassword());
    return CognitoService.resetPassword(currentPassword, newPassword)
      .then(result => {
        dispatch({ type: UPDATE_USER_PASSWORD_SUCCESS, result });
        return result;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function registerCognitoUser(credentials) {
  return dispatch => {
    dispatch(registerUser());
    return CognitoService.registerUser(credentials)
      .then(result => {
        dispatch({ type: REGISTER_USER_SUCCESS });
        return result;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function emailResetPasswordCode(email) {
  return dispatch => {
    dispatch(forgotPassword());
    return CognitoService.forgotPassword(email)
      .then(result => {
        dispatch({ type: SEND_PASSWORD_RESET_CODE_SUCCESS });
        return result;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function resetUserPassword(email, verificationCode, newPassword) {
  return dispatch => {
    dispatch(resetPassword());
    return CognitoService.confirmPassword(email, verificationCode, newPassword)
      .then(result => {
        dispatch({ type: RESET_PASSWORD_SUCCESS });
        return result;
      })
      .catch(err => {
        throw err;
      });
  };
}

export function verifyUserLoggedIn(credentials) {
  return dispatch => {
    dispatch(getUserSession());
    return CognitoService.getSession()
      .then(session => {
        dispatch({ type: VERIFY_USER_LOGGED_IN_SUCCESS, loginStatus: true });
        return session;
      })
      .catch(err => {
        dispatch({ type: VERIFY_USER_LOGGED_IN_FAIL, loginStatus: false });
        throw err;
      });
  };
}

export function logoutUserSession() {
  return dispatch => {
    dispatch(logoutUser());
    return CognitoService.logoutUser()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch(err => {
        console.log(err, 'error redux logout user session');
        dispatch({ type: LOGOUT_FAIL });
      });
  };
}
