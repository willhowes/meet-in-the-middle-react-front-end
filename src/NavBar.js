/*global google*/

import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import "./styles.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(query, event) {
  }

  render() {
    return (
      <div>
        <form
          // onSubmit={e => {
          //   this.handleSubmit(query, e);
          // }}
        >
        <input
          onClick={this.props.addMidlMarker}
          id="sign_up_button"
          className="myButton"
          type="submit"
          value="Sign up"
        />
        </form>

      </div>
    );
  }
}

export default NavBar;
