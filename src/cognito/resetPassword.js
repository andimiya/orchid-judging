import getSession from './getSession';

/*
 * Change an authenticated user's password
 *
 * @param {Array} currentPassword - The user's current password
 * @param {Array} newPassword - The user's new password
 * @returns {String} userObject - The Cognito User object
*/
export default (currentPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    let error = null;
    if (!currentPassword || !newPassword) {
      error = new Error('Missing either current or new password');
      return reject(error);
    }
    if (currentPassword === newPassword) {
      error = new Error('New password cannot match the current one');
      return reject(error);
    }
    return getSession()
      .then(cognitoUser => {
        cognitoUser.changePassword(
          currentPassword,
          newPassword,
          (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          }
        );
      })
      .catch(err => {
        reject(err);
      });
  });
};
