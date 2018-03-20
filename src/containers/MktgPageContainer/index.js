import React, { Component } from 'react';
import screenshot from '../../assets/crypto-track.png';

class MktgPageContainer extends Component {
  render() {
    return (
      <div className="outer">
        <h1>Track your shit with Crypto Tracker</h1>
        <p>Find out out much your cryptocurrency is worth, in real-time.</p>
        <p>
          Crypto Tracker will keep track of the exchange rate you originally
          purchased your cryptocurrency at, and automatically pull the current
          exchange rate in real-time to quickly display your cryptocurrency
          gains/losses.
        </p>
        <p>
          Start by creating an account, then add each cryptocurrency purchase.
        </p>
        <p>
          View a summary of all your purchases organized by coin type, or a
          transaction log of all your purchases.
        </p>
        <img src={screenshot} alt="Crypto Tracker" width="100%" />
        <div>
          <h2>Open Issues</h2>
          <ul>
            <li>
              After log in, automatic redirect isn't happening. Click a menu
              link manually to go somewhere.
            </li>
            <li>
              Times/Dates are difficult to see in the Dropdown when adding
              transactions
            </li>
            <li>
              After clicking logout in the menu, click the Crypto Tracker in the
              upper left, or refresh your browser, then you'll see the links to
              create an account or login
            </li>
            <li>Routing to homepage and marketing page is a little odd</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MktgPageContainer;
