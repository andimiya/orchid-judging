import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
// import HomepageContainer from './containers/HomepageContainer';
import WorkContainer from './containers/WorkContainer';
import WorkShowcaseContainer from './containers/WorkShowcaseContainer';
import ResumeContainer from './containers/ResumeContainer';
import Footer from './components/Footer';

const App = () =>
  <div id="app-container">
    <Router>
      <div className="app">
        <NavBar />
        <Route exact path="/" component={WorkContainer} />
        <Route exact path="/work" component={WorkContainer} />
        <Route exact path="/work/:work" component={WorkShowcaseContainer} />
        <Route exact path="/resume" component={ResumeContainer} />
        <Footer />
      </div>
    </Router>
  </div>;

export default App;
