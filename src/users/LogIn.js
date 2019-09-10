import React from "react";
import axios from "axios";
import "../styles.css";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
		"email": "",
		"password": "",
    showLogIn: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/sessions', { session: this.state })
    .then(response => {
      this.setState(state => ({showLogIn: false}))
    })
    .catch(error => {
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
          <img className="formLogo" src="midl-logo.png" alt="Hello World" />
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
        < /form>
      </div>

        :
        null
      }

      </div>

    );
  }
}

export default LogIn;
