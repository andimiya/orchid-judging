import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from './routes';

class App extends Component {
  
  render () {
    const { dispatch } = this.props;
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;