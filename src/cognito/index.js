import authenticateUser from './authenticateUser';
import getSession from './getSession';
import getUserAttributes from './getUserAttributes';
import logoutUser from './logoutUser';
import registerUser from './registerUser';
import resetPassword from './resetPassword';
import updateUserAttributes from './updateUserAttributes';
import confirmUser from './confirmUser';
import resendConfirmationEmail from './resendConfirmationEmail';
import { forgotPassword, confirmPassword } from './forgotPassword';

export default {
  authenticateUser,
  confirmPassword,
  forgotPassword,
  getSession,
  getUserAttributes,
  logoutUser,
  registerUser,
  resetPassword,
  updateUserAttributes,
  confirmUser,
  resendConfirmationEmail,
};
