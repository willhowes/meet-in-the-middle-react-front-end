import React from "react";
import PropTypes from "prop-types";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
import LogIn from "./LogIn";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserProfile: false,
      showSignUp: false,
      showLogIn: false
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
    this.setState(state => ({ showSignUp: false }));
    this.setState(state => ({ showUserProfile: false }));
    this.setState(state => ({ showLogIn: false }));
  }

  render() {
    return (
      <div>
        <img className="logo" src="midl-logo.png" onClick={this._hidePopUps} alt="Midl Logo" />
        <button
          onClick={this._onSignUpButtonClick}
          id="sign_up_button"
          className="navBarButton"
          style={{ right: "160px" }}
        >
          Sign up
        </button>
        {this.state.showSignUp ? <SignUp updateCurrentUser={this.props.setCurrentUser}/> : null}
        {this.props.currentUser && this.props.currentUser.id ? (
          <>
            <button
              onClick={this._onProfileButtonClick}
              id="profile_button"
              className="navBarButton"
            >
              Profile
            </button>
            {this.state.showUserProfile ? (
              <UserProfile
                currentUser={this.props.currentUser}
                updateCurrentUser={this.props.setCurrentUser}
              />
             ) : null}
          </>
        ) : null}


        <button
          onClick={this._onButtonClickLogIn}
          id="log_in_button"
          className="navBarButton"
          style={{ right: "300px" }}
        >
          Log In
        </button>
        {this.state.showLogIn ? <LogIn updateCurrentUser={this.props.setCurrentUser} /> : null}
      </div>
    );
  }
}

// Defines the types of the expected props passed into the component
NavBar.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
}

export default NavBar;
