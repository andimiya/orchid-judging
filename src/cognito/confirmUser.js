import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } from '../constants';

/*
 * Confirming a registered, unauthenticated user using a confirmation code
 *
 * @param {String} username - The user's username (email)
 * @param {String} confirmationCode - The confirmation code required to verify the user's email
 * @returns {String} result - The message returned by Cognito
*/
export default (username, confirmationCode) => {
  return new Promise((resolve, reject) => {
    if (!COGNITO_USER_POOL_ID || !COGNITO_CLIENT_ID) {
      const err = new Error('Missing cognito client ID or user pool ID');
      return reject(err);
    }
    const poolData = {
      UserPoolId: COGNITO_USER_POOL_ID,
      ClientId: COGNITO_CLIENT_ID,
    };

    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};
