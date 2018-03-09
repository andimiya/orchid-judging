import {
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } from '../constants';

/*
 * Register a new user with Cognito
 *
 * @param {Object} userInformation - The new user account information
 * @returns {String} userObject - The Cognito User object
*/
export default userInformation => {
  return new Promise((resolve, reject) => {
    // Validation Checks //
    let validationError = null;
    if (!COGNITO_USER_POOL_ID || !COGNITO_CLIENT_ID) {
      validationError = new Error('Missing user_pool_id or cognito_client_id');
      return reject(validationError);
    }
    if (
      !userInformation ||
      !(
        userInformation.firstName &&
        userInformation.email &&
        userInformation.password
      )
    ) {
      validationError = new Error('Missing required fields');
      return reject(validationError);
    }

    const { firstName, email, password, school } = userInformation;

    // Cognito //
    if (!COGNITO_USER_POOL_ID || !COGNITO_CLIENT_ID) {
      validationError = new Error('Missing user_pool_id or cognito_client_id');
      return reject(validationError);
    }
    const poolData = {
      UserPoolId: COGNITO_USER_POOL_ID,
      ClientId: COGNITO_CLIENT_ID,
    };
    const userPool = new CognitoUserPool(poolData);

    const attributeList = [];

    const dataEmail = {
      Name: 'email',
      Value: email,
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const dataName = {
      Name: 'name',
      Value: firstName,
    };
    const attributeName = new CognitoUserAttribute(dataName);

    attributeList.push(attributeEmail, attributeName);

    if (school) {
      const dataSchool = {
        Name: 'custom:school',
        Value: school,
      };
      const attributeSchool = new CognitoUserAttribute(dataSchool);
      attributeList.push(attributeSchool);
    }

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};
