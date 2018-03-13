import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import resendConfirmationEmail from './resendConfirmationEmail';
import { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } from '../constants';

/*
 * Authenticate a user with Cognito
 *
 * @param {String} email - The user's email
 * @returns {Object} data - The response from AWS after initiating the reset password flow
*/

function forgotPassword(email) {
  return new Promise((resolve, reject) => {
    const poolData = {
      UserPoolId: COGNITO_USER_POOL_ID,
      ClientId: COGNITO_CLIENT_ID,
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.forgotPassword({
      onSuccess: data => {
        console.log(data, 'data');
        return resolve({ data });
      },
      onFailure: err => {
        // User is not confirmed yet
        if (err.code === 'InvalidParameterException') {
          return resendConfirmationEmail(email)
            .then(result => {
              return resolve({ data: result, resendEmail: true });
            })
            .catch(err => {
              return reject(err);
            });
        }
        return reject(err);
      },
    });
  });
}

/*
 * Confirm a user's new password
 *
 * @param {String} userName - The user's username, currently their email
 * @param {String} verificationCode - The code sent to the user's email that allows them to reset their password
 * @param {String} newPassword - The user's new password
*/
function confirmPassword(username, verificationCode, newPassword) {
  return new Promise((resolve, reject) => {
    if (!username || !verificationCode || !newPassword) {
      const error = new Error('Missing required fields');
      return reject(error);
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
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onFailure(err) {
        return reject(err);
      },
      onSuccess() {
        return resolve();
      },
    });
  });
}

export { forgotPassword, confirmPassword };
