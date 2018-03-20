import getSession from './getSession';

/*
 * Logs out the current user
*/
export default () => {
  return new Promise((resolve, reject) => {
    return getSession()
      .then(cognitoUser => {
        return resolve(cognitoUser.signOut());
      })
      .catch(err => {});
  });
};
