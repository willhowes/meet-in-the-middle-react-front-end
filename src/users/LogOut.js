import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from "axios";

class LogOut extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
		"email": "",
		"password": "",
    showLogOut: true,
    showLogIn: false,
    loggedIn: false
    };

    this._onSelectLogOut = this._onSelectLogOut.bind(this);
    this._onSelectStayLoggedIn = this._onSelectStayLoggedIn.bind(this);
  }


  _onSelectLogOut(e) {
    e.preventDefault();
    axios.delete('http://localhost:3001/sessions/delete')
    .then(response => {
      console.log("user is logged out");
      this.setState(state => ({showLogIn: false, loggedIn: false, showLogOut: false}));
    }).then(response => this.props.updateLogInStatus())
    .catch(error => {
      console.log("did not log out");
      console.log(error.response)
    });
  }

  _onSelectStayLoggedIn(e) {
    e.preventDefault();
    console.log("stay logged in please");
    this.setState(state => ({showLogIn: false, showLogOut: false}));
  }

  render() {
  return (

    <div>

    { this.state.showLogOut ?


    <div className="signUpContainer">


      <form
        onSubmit={e => {
          this.onSubmit(e);
        }}
      >

        <center> <div className="signUpForm">
          <img className="formLogo" src="midl-logo.png" />
            <div className="formHeading">
              Are you sure you would like to log out?
            </div>

              <input
                id="log_in_submit"
                className="enterButton"
                value="Yes"
                style={{top: "-32px"}}
                onClick={this._onSelectLogOut}
              />

              <input
                id="log_in_submit"
                className="enterButton"
                value="No"
                style={{top: "-32px", left: "4px"}}
                onClick={this._onSelectStayLoggedIn}
              />

            </div>
        </center>
        </form>
      </div>

      :
      null
    }

      </div>

    );
  }
}

export default LogOut;
