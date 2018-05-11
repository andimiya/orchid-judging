import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MktgPageContainer from '../containers/MktgPageContainer';
import LoginContainer from '../containers/LoginContainer';
import ScoresheetContainer from '../containers/ScoresheetContainer';
import CreateAccountContainer from '../containers/CreateAccountContainer';
import ForgotPasswordContainer from '../containers/ForgotPasswordContainer';
import ResetPasswordContainer from '../containers/ResetPasswordContainer';
import UserAccountContainer from '../containers/UserAccountContainer';
import UserConfirmedContainer from '../containers/UserConfirmedContainer';
import Footer from '../components/Footer';
import CheckAuth from '../components/checkAuth';

const AuthRoutes = ({ component: Component, ...routeProps }) => (
  <Route
    {...routeProps}
    render={props => (
      <CheckAuth {...props}>
        <Component />
      </CheckAuth>
    )}
  />
);

const Routes = props => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/login" component={LoginContainer} />
        <Route
          exact
          path="/forgot-password"
          component={ForgotPasswordContainer}
        />
        <Route
          exact
          path="/create-account"
          component={CreateAccountContainer}
        />
        <Route
          exact
          path="/reset-password"
          component={ResetPasswordContainer}
        />
        <Route exact path="/" component={MktgPageContainer} />
        <Route exact path="/judging-forms" component={ScoresheetContainer} />
      </Switch>
      {/* <AuthRoutes path="/judging-forms" component={ScoresheetContainer} /> */}
      <AuthRoutes path="/account" component={UserAccountContainer} />
      <AuthRoutes path="/confirm" component={UserConfirmedContainer} />
      <Footer />
    </div>
  );
};

export default Routes;
