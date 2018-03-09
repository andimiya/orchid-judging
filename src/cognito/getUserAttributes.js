import getSession from './getSession';

/*
 * Retrieve an authenticated user's attributes
 *
 * @returns {Object} userAttributes - An object containing the current user's attributes
*/
export default () => {
  return new Promise((resolve, reject) => {
    return getSession()
      .then(cognitoUser => {
        cognitoUser.getUserAttributes((err, result) => {
          if (err) {
            return reject(err);
          }
          let userAttributes = {};
          result.forEach(attribute => {
            userAttributes[attribute.getName()] = attribute.getValue();
          });
          return resolve(userAttributes);
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};
