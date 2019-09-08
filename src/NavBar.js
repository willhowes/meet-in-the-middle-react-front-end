/*global google*/

import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import "./styles.css";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile"


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showUserProfile: false,
      showSignUp: false,
    };
    this._onProfileButtonClick = this._onProfileButtonClick.bind(this);
    this._onSignUpButtonClick = this._onSignUpButtonClick.bind(this);
    this._hidePopUps = this._hidePopUps.bind(this);
  }

  _onProfileButtonClick(e) {
    e.preventDefault();
    this.setState(state => ({
      showUserProfile: !state.showUserProfile
    }));
  }

  _onSignUpButtonClick(e) {
    e.preventDefault();
    this.setState(state => ({
      showSignUpForm: !state.showSignUpForm
    }));
  }

  _hidePopUps(e) {
    e.preventDefault();
    this.setState(state => ({showSignUpForm: false}));
    this.setState(state => ({showUserProfile: false}));
  }

  // handleSubmit(query, event) {
  // }

  render() {
    return (
      <div>
        <form
          // onSubmit={e => {
          //   this.handleSubmit(query, e);
          // }}
        >
        <img className="logo" src="midl-logo.png" onClick={this._hidePopUps} />
        <input
          onClick={this._onSignUpButtonClick}
          id="sign_up_button"
          className="navBarButton"
          type="submit"
          value="Sign up"
          style={{right: "160px"}}
        />
        {this.state.showSignUpForm ?
          <SignUp /> :
          null
        }
        <input
          onClick={this._onProfileButtonClick}
          id="sign_up_button"
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
