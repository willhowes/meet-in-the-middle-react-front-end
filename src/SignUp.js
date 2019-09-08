import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from "axios";
import "./styles.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
		"name": "",
		"email": "",
		"password": "",
		"passwordConfirmation": ""

    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('https://meet-in-the-middle-backend-api.herokuapp.com/users', { user: this.state })
    .then(response => {
      console.log("yay");
    	console.log(response)
    })
    .catch(error => {
      console.log("nooo");
        console.log(error.response)
    });
  }


  render() {
  return (
    <div className="signUpContainer">
      <form
        onSubmit={e => {
          this.onSubmit(e);
        }}
      >

    <center> <div className="signUpForm">
      <img className="formLogo" src="midl-logo.png" />
        <div className="formHeading">
          Create your meet in the midl account
        </div>
          <center><input
            className="formFillIn"
            id="user_name"
            type="text"
            name="name"
            placeholder={"Name"}
            value={this.state.name}
            onChange={this.onChange}
          /></center>
            <input
              className="formFillIn"
              id="user_email"
              type="text"
              placeholder={"Email address"}
              name="email"
              value={this.state.email}
              onChange={this.onChange}

            />
              <input
                className="formFillIn"
                id="user_password"
                type="password"
                placeholder={"Password"}
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
                <input
                  className="formFillIn"
                  id="user_password_confirmation"
                  type="password"
                  name="passwordConfirmation"
                  placeholder={"Confirm password"}
                  value={this.state.passwordConfirmation}
                  onChange={this.onChange}
                />
              <input
                id="sign_up_button"
                className="enterButton"
                type="submit"
                value="Sign up"
              />
            </div> </center>
        </form>
      </div>
    );
  }
}

export default SignUp;
