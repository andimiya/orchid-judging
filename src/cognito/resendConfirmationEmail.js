import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
const { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } = process.env;

/*
 * Resend a confirmation email to the requesting user
 *
 * @param {String} email - The user's email
 * @returns {Object} data - The response from AWS after resending the confirmation email
*/
export default email => {
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
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};
