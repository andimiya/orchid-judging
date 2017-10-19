import React from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomepageContainer from './containers/HomepageContainer';
import Footer from './components/Footer';

const App = () =>
  <div id="app-container">
    <BrowserRouter basename="/crypto-tracker">
      <div className="app">
        <NavBar />
          <Route exact path="/" component={HomepageContainer} />
        <Footer />
      </div>
    </BrowserRouter>
  </div>;

export default App;
