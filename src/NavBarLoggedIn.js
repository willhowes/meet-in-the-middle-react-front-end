/*global google*/

import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import "./styles.css";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile"
import LogIn from "./LogIn";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserProfile: false,
      showLogOut: false,
    };
    this._onLogOutButtonClick = this._onLogOutButtonClick.bind(this);
    this._onProfileButtonClick = this._onProfileButtonClick.bind(this);
    this._hidePopUps = this._hidePopUps.bind(this);
  }

  _onProfileButtonClick(e) {
    e.preventDefault();
    this.setState(state => ({
      showUserProfile: !state.showUserProfile,
      showLogOut: false,
    }));
  }

  _onLogOutButtonClick(e) {
    e.preventDefault();
    this.setState(state => ({
      showLogIn: !state.showLogOut,
      showUserProfile: false
    }));
  }

  _hidePopUps(e) {
    e.preventDefault();
    this.setState(state => ({showLogOut: false}));
    this.setState(state => ({showUserProfile: false}));
  }



  render() {
    return (
      <div>
        <form
        >
        <img className="logo" src="midl-logo.png" onClick={this._hidePopUps} />
        <input
          onClick={this._onLogOutButtonClick}
          id="log_out_button"
          className="navBarButton"
          type="submit"
          value="Log Out"
        />
        {this.state.showSignUp ?
          <LogOut /> :
          null
        }

        <input
            onClick={this._onProfileButtonClick}
            id="profile_button"
            className="navBarButton"
            type="submit"
            value="Profile"
          />
          {this.state.showUserProfile ?
            <UserProfile /> :
            null
          }

          </form>
      </div>
    );
  }
}

export default NavBar;
