/*global google*/

import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import "./styles.css";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile"
import LogIn from "./LogIn";
import LogOut from "./LogOut";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showUserProfile: false,
      showSignUp: false,
      showLogIn: false,
      showLogOut: false,
    };
    this._onProfileButtonClick = this._onProfileButtonClick.bind(this);
    this._onLogOutButtonClick = this._onLogOutButtonClick.bind(this);
    this._onSignUpButtonClick = this._onSignUpButtonClick.bind(this);
    this._onButtonClickLogIn = this._onButtonClickLogIn.bind(this);
    this._hidePopUps = this._hidePopUps.bind(this);
  }

  _onProfileButtonClick(e) {
    e.preventDefault();
    this.setState(state => ({
      showUserProfile: !state.showUserProfile,
      showLogIn: false,
      showSignUp: false
    }));
  }

  _onButtonClickLogIn(e) {
    e.preventDefault();
    this.setState(state => ({
      showLogIn: !state.showLogIn,
      showSignUp: false,
      showUserProfile: false
    }));
  }

  _onSignUpButtonClick(e) {
    e.preventDefault();
    this.setState(state => ({
      showSignUp: !state.showSignUp,
      showLogIn: false,
      showUserProfile: false
    }));
  }

  _onLogOutButtonClick(e) {
    e.preventDefault();
    console.log("showing the log out page");
    this.setState(state => ({
      showLogOut: !state.showLogOut,
      showLogIn: false,
      showUserProfile: false
    }));
  }

  _hidePopUps(e) {
    e.preventDefault();
    this.setState(state => ({showLogOut: false}));
    this.setState(state => ({showUserProfile: false}));
    // this.setState(state => ({showLogIn: false}));
  }

  updateLogInStatus = () => {
      this.setState( {loggedIn: !this.state.loggedIn} )
  }



  render() {
    console.log(this.state.loggedIn)

      return (
        <div>

        {!this.state.loggedIn ?

          <form
          >
          <img className="logo" src="midl-logo.png" onClick={this._hidePopUps} />
          <input
            onClick={this._onSignUpButtonClick}
            id="sign_up_button"
            className="navBarButton"
            type="submit"
            value="Sign up"
          />
          {this.state.showSignUp ?
            <SignUp /> :
            null
          }

            <input
              onClick={this._onButtonClickLogIn}
              id="log_in_button"
              className="navBarButton"
              type="submit"
              value="Log In"
              style={{right: "160px"}}
            />
            {this.state.showLogIn ?
              <LogIn updateLogInStatus={this.updateLogInStatus} /> :
              null
            }
          </form>

        :  null
        }


        {this.state.loggedIn ?

          <form
          >
          <img className="logo" src="midl-logo.png" onClick={this._hidePopUps} />
          <input
            onClick={this._onLogOutButtonClick}
            id="log_out_button"
            className="navBarButton"
            type="submit"
            value="Log Out"
            style={{right: "160px"}}
          />
          console.log(this.state.showLogOut);
          {this.state.showLogOut ?
            <LogOut updateLogInStatus={this.updateLogInStatus} /> :
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
          :
          null
        }

        </div>
      );
    }
}

export default NavBar;
