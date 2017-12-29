import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomepageContainer from './containers/HomepageContainer';
import TransactionContainer from './containers/TransactionContainer';
import LoginContainer from './containers/LoginContainer';
import CreateAccountContainer from './containers/CreateAccountContainer';
import NewInvestments from './containers/NewInvestments';
import Footer from './components/Footer';
//
// const isAuthenticated = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     username = null;
//     return res.redirect('/login');
//   }
//   return next();
// };
//
// const requireAuth = (nextState, replace, callback) => {
//   const accessToken = nextState.location.query.access_token;
//   return isAuthenticated(accessToken, err => {
//     if (err) {
//       replace('/login');
//     }
//     callback();
//   });
// };

const App = () =>
  <div id="app-container">
    <BrowserRouter>
      <div className="app">
        <NavBar />
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/" component={HomepageContainer} />
          <Route
            exact path="/transactions"
            component={TransactionContainer}
          />
          <Route exact path="/create-account" component={CreateAccountContainer} />
          <Route exact path="/new-investments" component={NewInvestments} />
        <Footer />
      </div>
    </BrowserRouter>
  </div>;

export default App;
