import React, { Component } from 'react';
import screenshot from '../../assets/crypto-track.png';

class MktgPageContainer extends Component {
  render() {
    return (
      <div className="outer">
        <h1>Orchid Judging App</h1>
        <p>
          Type in scores for orchids and track historical scores for orchids
        </p>
        <p>
          If you're getting judged, look up your scores for all of your plants
        </p>
      </div>
    );
  }
}

export default MktgPageContainer;
