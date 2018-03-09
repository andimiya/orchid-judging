import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } from '../constants';

/*
 * Authenticate a user with Cognito
 *
 * @param {Object} userData - The user's credentials for logging
 * @returns {String} token - The JWT returned from Cognito
*/
export default credentials => {
  return new Promise((resolve, reject) => {
    // Validation Checks //
    let validationError = null;
    if (!credentials || (!credentials.userName && !credentials.password)) {
      validationError = new Error('Missing userName or password');
      return reject(validationError);
    }
    if (!COGNITO_USER_POOL_ID || !COGNITO_CLIENT_ID) {
      validationError = new Error('Missing user_pool_id or cognito_client_id');
      return reject(validationError);
    }
    const { userName, password } = credentials;

    const authenticationData = {
      Username: userName,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const poolData = {
      UserPoolId: COGNITO_USER_POOL_ID,
      ClientId: COGNITO_CLIENT_ID,
    };
    const userPool = new CognitoUserPool(poolData);

    const userData = {
      Username: userName,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        return resolve(result);
      },
      onFailure: err => {
        return reject(err);
      },
    });
  });
};
