/*
 * Checks user input to verify that it is a valid email address
 *
 * @params {String} email - The email address to validate
 * @returns {Boolean} - Whether or not the email address is valid
*/
const isValidEmail = email => {
  if (!email) {
    return false;
  }
  const isValid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  return !isValid;
};

export default {
  isValidEmail,
};
