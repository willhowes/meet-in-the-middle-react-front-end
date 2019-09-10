import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from "axios";
import "./styles.css";

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
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log({session: this.state.showLogOut});
    axios.delete('http://localhost:3001/sessions/delete')
    .then(response => {
      console.log("user is logged out");
      this.setState(state => ({showLogIn: false, loggedIn: false, showLogIn: false}));
    }).then(response => this.props.updateLogInStatus())
    .catch(error => {
      console.log("did not log out");
      console.log(error.response)
    });
  }

  render() {
  return (

    <div>


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
                type="submit"
                value="Yes"
                style={{top: "-32px"}}
              />

            </div>
        </center>
        < /form>
      </div>

      </div>

    );
  }
}

export default LogOut;
