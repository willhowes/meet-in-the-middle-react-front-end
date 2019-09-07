/*global google*/

import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import "./styles.css";
import SignUp from "./SignUp";
import LogIn from "./LogIn";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showSignUp: false,
      showLogIn: false
    };
    this._onButtonClickSignUp = this._onButtonClickSignUp.bind(this);
    this._onButtonClickLogIn = this._onButtonClickLogIn.bind(this);

  }

  _onButtonClickSignUp(e) {
    e.preventDefault();
    this.setState(state => ({
      showSignUp: !state.showSignUp,
      showLogIn: false
    }));
  }

  _onButtonClickLogIn(e) {
    e.preventDefault();
    this.setState(state => ({
      showLogIn: !state.showLogIn,
      showSignUp: false
    }));
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
          <input
            onClick={this._onButtonClickSignUp}
            id="sign_up_button"
            className="myButton"
            type="submit"
            value="Sign up"
          />
          {this.state.showSignUp ?
            <SignUp /> :
            null
          }
          </form>

          <form>
            <input
              onClick={this._onButtonClickLogIn}
              id="log_in_button"
              className="myButton"
              type="submit"
              value="Log In"
            />
            {this.state.showLogIn ?
              <LogIn /> :
              null
            }
          </form>
      </div>
    );
  }
}

export default NavBar;
