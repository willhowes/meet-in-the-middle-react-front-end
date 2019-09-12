import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
		"email": "",
		"password": "",
    showLogIn: true,
    loggedIn: false,
    showLogOut: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/sessions", { session: this.state })
      .then(response => {
        console.log("success: ", response)
        this.setState({ showLogIn: false });
        this.props.updateCurrentUser(response.data) 
      })
      .catch(error => {
        console.log("nooo");
        console.log(error.response);
      });

  }

  render() {
  return (

    <div>

    { this.state.showLogIn ?


    <div className="signUpContainer">


      <form
        onSubmit={e => {
          this.onSubmit(e);
        }}
      >

        <center> <div className="signUpForm">
          <img className="formLogo" src="midl-logo.png" alt="Midl Logo" />
            <div className="formHeading">
              Log in to your meet in the midl account
            </div>

            <input
              id="log_in_email"
              type="text"
              className="formFillIn"
              placeholder={"Email address"}
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />

              <input
                id="log_in_password"
                type="password"
                className="formFillIn"
                placeholder={"Password"}
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />

              <input
                id="log_in_submit"
                className="enterButton"
                type="submit"
                value="Log In"
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

LogIn.propTypes = {
  updateCurrentUser: PropTypes.func.isRequired,
}

export default LogIn;
