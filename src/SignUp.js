import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from "axios";
import "./styles.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('https://meet-in-the-middle-backend-api.herokuapp.com/', { user: this.state })
    .then(res => {
      console.log(res);
      console.log(res.data);
})
  }


  render() {
    return (
      <div style={{ margin: 10 }}>
      <div className="signUpContainer">
        <form
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
        <p
          style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
        >
        Name
        </p>

          <input
            id="user_name"
            type="text"
            name="name"
            placeholder={"Name"}
            value={this.state.name}
            onChange={this.onChange}
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
              name="email"
              value={this.state.email}
              onChange={this.onChange}
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
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <p
                style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
              >
              Confirm Password
              </p>

                <input
                  id="user_password_confirmation"
                  type="password"
                  name="passwordConfirmation"
                  placeholder={"Confirm password"}
                  value={this.state.passwordConfirmation}
                  onChange={this.onChange}
                />
              <input
                id="sign_up_button"
                className="myButton"
                type="submit"
                value="Sign up"
              />
        </form>
      </div>
      </div>
    );
  }
}

export default SignUp;
