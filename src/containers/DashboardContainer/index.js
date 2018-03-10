import React, { Component } from 'react';

class DashboardContainer extends Component {

  render() {
    console.log(this.props.children);
    return (
      <div>
        {this.props.children}
      </div>
    )
  };
};

export default DashboardContainer;
