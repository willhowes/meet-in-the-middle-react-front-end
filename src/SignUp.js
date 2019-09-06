import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import "./styles.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit(query, event) {
  // }

  render() {
    return (
      <div style={{ margin: 10 }}>
      <div className="signUpContainer">
        <form
          // onSubmit={e => {
          //   this.handleSubmit(query, e);
          // }}
        >
        <p
          style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
        >
        Name
        </p>

          <input
            id="user_name"
            type="text"
            placeholder={"Name"}
            value={this.state.name}
          />
          <p
            style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
          >
          Email
          </p>

            <input
              id="user_email"
              type="text"
              placeholder={"Email address"}
              value={this.state.email}
            />
            <p
              style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
            >
            Password
            </p>

              <input
                id="user_password"
                type="password"
                placeholder={"Password"}
                value={this.state.password}
              />
              <p
                style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
              >
              Confirm Password
              </p>

                <input
                  id="user_password_confirmation"
                  type="password"
                  placeholder={"Confirm password"}
                  value={this.state.passwordConfirmation}
                />
        </form>
      </div>
      </div>
    );
  }
}

export default SignUp;
