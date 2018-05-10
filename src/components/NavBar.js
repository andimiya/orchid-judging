import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCognitoUser,
  logoutUserSession,
  getDatabaseUserInfo
} from '../redux/auth';
const hamburger = require('../assets/hamburger.svg');
const profileIcon = require('../assets/profileIcon.svg');

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.userIsLoggedIn,
    firstName: state.auth.userInformation.first_name
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
  }

  handleClick() {
    if (this.state.navClass === 'navbar-container') {
      this.setState({ navClass: 'responsive-container' });
    } else {
      this.setState({ navClass: 'navbar-container' });
    }
  }

  collapseNav() {
    this.setState({ navClass: 'navbar-container' });
  }

  logoutCurrentUser() {
    if (this.props.isLoggedIn) {
      this.props
        .logoutUserSession()
        .then(() => {
          this.props.history.push('/');
        })
        .catch(err => {});
    } else {
      return true;
    }
  }

  render() {
    let menuProperties = [
      {
        menuItemContainerClass: 'menu-item',
        linkTo: '/judging-forms',
        onClick: this.collapseNav,
        navDisplayText: 'Judging Forms',
        showWhenLoggedIn: true
      },
      {
        menuItemContainerClass: 'menu-item',
        linkTo: '/create-account',
        onClick: this.collapseNav,
        navDisplayText: 'Create Account',
        isLoggedInClass: this.props.isLoggedIn,
        showWhenLoggedIn: false
      },
      {
        menuItemContainerClass: 'menu-item',
        linkTo: '/login',
        onClick: this.collapseNav,
        navDisplayText: 'Log In',
        showWhenLoggedIn: false
      },
      {
        menuItemContainerClass: 'menu-item',
        linkTo: '/',
        onClick: this.props.logoutUserSession,
        navDisplayText: 'Log Out',
        showWhenLoggedIn: true
      }
    ];

    return (
      <div className={this.state.navClass}>
        <div className="name-container">
          <Link to="/" onClick={this.collapseNav}>
            <p>Orchid Judging</p>
          </Link>
        </div>

        <div className="menu-item-container">
          {menuProperties
            .filter(menuProperties => {
              return menuProperties.showWhenLoggedIn === this.props.isLoggedIn;
            })
            .map(properties => {
              return (
                <div
                  key={properties.linkTo}
                  className={properties.menuItemContainerClass}
                >
                  <Link to={properties.linkTo} onClick={properties.onClick}>
                    <p>{properties.navDisplayText}</p>
                  </Link>
                </div>
              );
            })}
          <div className="menu-item">
            <Link to="/account">
              {!this.props.firstName ? (
                <p />
              ) : (
                <p>
                  <img
                    src={profileIcon}
                    alt="Profile"
                    width="35px"
                    height="35px"
                  />
                  {this.props.firstName}
                </p>
              )}
            </Link>
          </div>
        </div>

        <div className="hamburger">
          <div onClick={this.handleClick}>
            <img
              src={hamburger}
              alt="Work, Resume, Contact"
              width="40px"
              onClick={this.handleClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getCognitoUser,
  logoutUserSession,
  getDatabaseUserInfo
})(NavBar);
