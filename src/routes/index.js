import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from 'react-router';
import NavBar from '../components/NavBar';
import MktgPageContainer from '../containers/MktgPageContainer';
import HomepageContainer from '../containers/HomepageContainer';
import TransactionContainer from '../containers/TransactionContainer';
import LoginContainer from '../containers/LoginContainer';
import CreateAccountContainer from '../containers/CreateAccountContainer';
import ForgotPasswordContainer from '../containers/ForgotPasswordContainer';
import ResetPasswordContainer from '../containers/ResetPasswordContainer';
import NewInvestmentsContainer from '../containers/NewInvestmentsContainer';
import UserAccountContainer from '../containers/UserAccountContainer';
import UserConfirmedContainer from '../containers/UserConfirmedContainer';
import Footer from '../components/Footer';
import AuthWrapper from '../components/checkAuth';

const AuthRoutes = ({ component: Component, ...routeProps }) => (
  <Route { ...routeProps } render={ props => (
    <AuthWrapper { ...props }>
      <Component />
    </AuthWrapper>
  ) } />
);

const Routes = props => {
  return (
    <div>
      <NavBar />
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/forgot-password" component={ForgotPasswordContainer} />
          <Route exact path="/create-account" component={CreateAccountContainer} />
          <Route exact path="/reset-password" component={ResetPasswordContainer} />            
          <Route exact path="/" component={MktgPageContainer} />            
        </Switch>
        <AuthRoutes path="/summary" component={HomepageContainer} />
        <AuthRoutes path="/transactions" component={TransactionContainer} />
        <AuthRoutes path="/account" component={UserAccountContainer} />
        <AuthRoutes path="/new-investments" component={NewInvestmentsContainer} />
        <AuthRoutes path="/confirm" component={UserConfirmedContainer} />
      <Footer />
    </div>
  );
};

export default Routes;
