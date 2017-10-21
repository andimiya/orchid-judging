import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomepageContainer from './containers/HomepageContainer';
import TransactionContainer from './containers/TransactionContainer';
import Footer from './components/Footer';

const App = () =>
  <div id="app-container">
    <BrowserRouter basename="/crypto-tracker">
      <div>
        <NavBar />
          <Route exact path="/" component={HomepageContainer} />
          <Route exact path="/transactions" component={TransactionContainer} />
        <Footer />
      </div>
    </BrowserRouter>
  </div>;

export default App;
