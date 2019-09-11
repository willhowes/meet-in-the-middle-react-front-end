import React from "react";
import "../styles.css";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showUserProfile: false,
      showSignUp: false,
      showLogIn: false,
    };
    this._onProfileButtonClick = this._onProfileButtonClick.bind(this);
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

  _hidePopUps(e) {
    e.preventDefault();
    this.setState(state => ({showSignUp: false}));
    this.setState(state => ({showUserProfile: false}));
    this.setState(state => ({showLogIn: false}));
  }



  render() {
    return (
      <div>
        <img
          alt="Hello World"
          className="logo"
          src="midl-logo.png"
          onClick={this._hidePopUps}
          style={{cursor: "pointer"}}
          />
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
          <LogIn /> :
          null
        }
      </div>
    );
  }
}

export default NavBar;
