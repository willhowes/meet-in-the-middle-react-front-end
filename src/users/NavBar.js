import React from "react";
import PropTypes from "prop-types";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import SignUpAvatar from "./SignUpAvatar";
import ProfileAvatar from "./ProfileAvatar";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserProfile: false,
      showSignUp: false,
      showLogIn: false,
      showLogOut: false
    };
    this._onProfileButtonClick = this._onProfileButtonClick.bind(this);
    this._onSignUpButtonClick = this._onSignUpButtonClick.bind(this);
    this._onButtonClickLogIn = this._onButtonClickLogIn.bind(this);
    this._onButtonClickLogOut = this._onButtonClickLogOut.bind(this);
    this._hidePopUps = this._hidePopUps.bind(this);
  }

  _onProfileButtonClick(e) {
    e.preventDefault();
    this.setState(state => ({
      showUserProfile: !state.showUserProfile,
      showLogIn: false,
      showSignUp: false,
      showLogOut: false
    }));
  }

  _onButtonClickLogIn(e) {
    e.preventDefault();
    this.setState(state => ({
      showLogIn: !state.showLogIn,
      showSignUp: false,
      showUserProfile: false,
      showLogOut: false
    }));
  }

  _onSignUpButtonClick(e) {
    e.preventDefault();
    this.setState(state => ({
      showSignUp: !state.showSignUp,
      showLogIn: false,
      showUserProfile: false,
      showLogOut: false
    }));
  }

  _onButtonClickLogOut(e) {
    e.preventDefault();
    this.setState(state => ({
      showLogOut: !state.showLogOut,
      showLogIn: false,
      showUserProfile: false
    }));
  }

  _hidePopUps(e) {
    e.preventDefault();
    this.setState(state => ({ showSignUp: false }));
    this.setState(state => ({ showUserProfile: false }));
    this.setState(state => ({ showLogIn: false }));
    this.setState(state => ({ showLogOut: false }));
  }

  render() {
    return (
      <div>
        <img
          className="logo"
          src="midl-logo.png"
          onClick={this._hidePopUps}
          alt="Midl Logo"
        />
        {!this.props.currentUser ? (
          <button
            onClick={this._onSignUpButtonClick}
            id="sign_up_button"
            className="navBarButton"
            style={{ right: "16px" }}
          >
            Sign up
          </button>
        ) : null}
        {this.state.showSignUp ? (
          <SignUp updateCurrentUser={this.props.setCurrentUser} />
        ) : null}

        <button
          onClick={this._onButtonClickLogIn}
          id="log_in_button"
          className="navBarButton"
          style={{ right: "124px" }}
        >
          Log In
        </button>
        {this.state.showLogIn ? (
          <LogIn updateCurrentUser={this.props.setCurrentUser} />
        ) : null}

        {this.props.currentUser && this.props.currentUser.id ? (
          <>
            <button
              onClick={this._onProfileButtonClick}
              id="profile_button"
              className="profileAvatar"
            >
              {
                <ProfileAvatar
                  avatarBlob={this.state.avatar}
                  avatarPath={this.props.currentUser.avatar_path}
                />
              }
            </button>
            {this.state.showUserProfile ? (
              <UserProfile
                currentUser={this.props.currentUser}
                updateCurrentUser={this.props.setCurrentUser}
              />
            ) : null}

            <button
              onClick={this._onButtonClickLogOut}
              id="log_out_button"
              className="navBarButton"
              style={{ right: "124px" }}
            >
              Log Out
            </button>
            {this.state.showLogOut ? (
              <LogOut updateCurrentUser={this.props.setCurrentUser} />
            ) : null}
          </>
        ) : null}
      </div>
    );
  }
}

// Defines the types of the expected props passed into the component
NavBar.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired
};

export default NavBar;
