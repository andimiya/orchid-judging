import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import getSession from './getSession';

/*
 * Update a user's attributes such as email, first name, school etc
 *
 * @param {Array} updatedAttributes - The updated user attributes, each with a Value and Name key
 * @returns {String} userObject - The Cognito User object
*/
export default updatedAttributes => {
  return new Promise((resolve, reject) => {
    let error = null;
    return getSession()
      .then(cognitoUser => {
        const attributeList = updatedAttributes.map(attribute => {
          if (
            !attribute.hasOwnProperty('Name') ||
            !attribute.hasOwnProperty('Value')
          ) {
            error = new Error('Not all attributes have Value and/or Name keys');
            return reject(error);
          }
          return new CognitoUserAttribute(attribute);
        });
        return cognitoUser.updateAttributes(attributeList, (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};
