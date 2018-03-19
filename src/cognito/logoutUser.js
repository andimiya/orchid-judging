import getSession from './getSession';

/*
 * Logs out the current user
*/
export default () => {
  return new Promise((resolve, reject) => {
    return getSession()
      .then(cognitoUser => {
        console.log(cognitoUser, 'cognito user logoutuser.js');
        return resolve(cognitoUser.signOut());
      })
      .catch(err => {
        console.log(err, 'catch - error');

        localStorage.clear();
      });
  });
};
