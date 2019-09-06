/*global google*/

import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import "./styles.css";
import SignUp from "./SignUp";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showComponent: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick(e) {
    e.preventDefault();
    this.setState(state => ({
      showComponent: !state.showComponent
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
          onClick={this._onButtonClick}
          id="sign_up_button"
          className="myButton"
          type="submit"
          value="Sign up"
        />
        {this.state.showComponent ?
          <SignUp /> :
          null
        }
        </form>

      </div>
    );
  }
}

export default NavBar;
