import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from "axios";
import "./styles.css";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
		"name": "",
		"email": "",
		"password": "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    // e.preventDefault();
    // axios.post('https://meet-in-the-middle-backend-api.herokuapp.com/users', { user: this.state })
    // .then(response => {
    //   console.log("THIS WORKS");
    // 	console.log(response)
    // })
    // .catch(error => {
    //   console.log("nooo");
    //     console.log(error.response)
    // });
  }


  render() {
    return (
      <div className="signUpContainer">
        <p style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}>
        Log In</p>

        <form
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
          <p style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}>
          Email</p>

            <input
              id="log_in_email"
              type="text"
              placeholder={"Email address"}
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <p style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}>
            Password
            </p>

              <input
                id="log_in_password"
                type="password"
                placeholder={"Password"}
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />

              <input
                id="log_in_submit"
                className="myButton"
                type="submit"
                value="Log In"
              />
        </form>
      </div>
    );
  }
}

export default LogIn;
