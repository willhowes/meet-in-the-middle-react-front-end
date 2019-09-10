import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      showSignUp: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  fileChangedHandler = event => {
    this.setState({ avatar: event.target.files[0] });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // object destructuring - look it up
    const { name, email, password, passwordConfirmation, avatar } = this.state
    axios({
      method: "post",
      url: "http://localhost:3001/users",
      // url: 'https://meet-in-the-middle-backend-api.herokuapp.com/users',
      data: { 
        user: {
          name,
          email,
          password,
          passwordConfirmation,
          avatar, 
        }
      },
      header: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        this.setState({ showSignUp: false });
        this.props.updateCurrentUser(response.data);
      })
      .catch(error => {
        console.error({ user: this.state });
        console.error(error.response);
      });
  }

  render() {
    return (
      <div>
        {this.state.showSignUp ? (
          <div className="signUpContainer">
            <form
              onSubmit={e => {
                this.onSubmit(e);
              }}
            >
              <center>
                {" "}
                <div className="signUpForm">
                  <img className="formLogo" src="midl-logo.png" />
                  <div className="formHeading">
                    Create your meet in the midl account
                  </div>
                  <img className="signUpAvatar" src={this.state.avatar} />
                  <input
                    name="avatar"
                    className="selectAvatar"
                    type="file"
                    onChange={this.fileChangedHandler}
                  />

                  <center>
                    <input
                      className="formFillIn"
                      id="user_name"
                      type="text"
                      name="name"
                      placeholder={"Name"}
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </center>
                  <input
                    className="formFillIn"
                    id="user_email"
                    type="text"
                    placeholder={"Email address"}
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <div className="passwordInfo">
                    {" "}
                    Password must be at least 6 letters{" "}
                  </div>
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
                </div>{" "}
              </center>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

SignUp.propTypes = {
  updateCurrentUser: PropTypes.func.isRequired,
}

export default SignUp;
