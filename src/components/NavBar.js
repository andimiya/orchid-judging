import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCognitoUser, logoutUserSession } from '../redux/auth';
const hamburger = require('../assets/hamburger.svg');

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.userIsLoggedIn
  };
}

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.collapseNav = this.collapseNav.bind(this);
    this.logoutCurrentUser = this.logoutCurrentUser.bind(this);

    this.state = {
      navClass: 'navbar-container'
    };
    let loggedIn = null;
  }

  handleClick(){
    if (this.state.navClass === 'navbar-container') {
      this.setState ({ navClass: 'responsive-container' })
    } else {
      this.setState ({ navClass: 'navbar-container' })
    }
  }

  collapseNav(){
    this.setState ({ navClass: 'navbar-container'})
  }

  logoutCurrentUser = () => {
    if (this.props.isLoggedIn){
      this.props
        .logoutUserSession()
        .then(() => {
          this.props.history.push('/homepage')
        })
        .catch(err => {});
    } else {
      return;
    }
  };

  render() {

    let menuProperties = [
      {
        menuItemContainerClass: "menu-item",
        linkTo: "/transactions",
        onClick: this.collapseNav,
        navDisplayText: "Transactions",
        showWhenLoggedIn: true
      },
      {
        menuItemContainerClass: "menu-item",
        linkTo: "/new-investments",
        onClick: this.collapseNav,
        navDisplayText: "Add New",
        showWhenLoggedIn: true
      },
      {
        menuItemContainerClass: "menu-item",
        linkTo: "/create-account",
        onClick: this.collapseNav,
        navDisplayText: "Create Account",
        isLoggedInClass: this.props.isLoggedIn,
        showWhenLoggedIn: false
      },
      {
        menuItemContainerClass: "menu-item",
        linkTo: "/login",
        onClick: this.collapseNav,
        navDisplayText: "Log In",
        showWhenLoggedIn: false
      },
      {
        menuItemContainerClass: "menu-item",
        linkTo: "/",
        onClick: this.logoutCurrentUser,
        navDisplayText: "Log Out",
        showWhenLoggedIn: true
      },
    ]

    return (
      <div className={this.state.navClass}>
        <div className="name-container">
          <Link to="/homepage" onClick={this.collapseNav}>
            <p>Crypto Tracker</p>
          </Link>
        </div>

        <div className="menu-item-container">
          {menuProperties.filter((menuProperties) => {
            return menuProperties.showWhenLoggedIn === this.props.isLoggedIn;
            }).map(properties => {
              return (
                <div key={properties.linkTo} className={properties.menuItemContainerClass}>
                  <Link to={properties.linkTo} onClick={properties.onClick}>
                    <p>{properties.navDisplayText}</p>
                  </Link>
                </div>
              )
            })}
        </div>

          <div className="hamburger">
            <div onClick={this.handleClick}>
              <img src={hamburger} alt="Work, Resume, Contact" width="40px" onClick={this.handleClick} />
            </div>
          </div>

      </div>
    );
  }
};

export default connect(mapStateToProps, {
  getCognitoUser, logoutUserSession
})(NavBar);
