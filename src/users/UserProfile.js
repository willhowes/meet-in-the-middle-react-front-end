import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from "axios";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
    isEditing: false,
    user: this.props.user,
		// "photo": "",
    // "name": "",
		// "email": "",
		// "password": "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('https://meet-in-the-middle-backend-api.herokuapp.com/users', { user: this.state })
    .then(response => {
    })
    .catch(error => {
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
          View and edit your account details
        </div>

        <div align="center">
            <button
              onClick={() => {
                this.setState({ editing: true });
              }}
            >
              Edit
            </button>
          </div>

        <div className="formLabel">Name</div>
        {this.state.editing ? (
          <div className="userInfo">{this.state.name}</div>
        ) : (
          <input
            type="text"
            defaultValue={this.state.name}
            className="formFillIn"
            id="user_name"
            type="text"
            name="name"
            onChange={this.onChange}
          />
        )}






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
              <div className="passwordInfo" > Password must be at least 6 letters </div>
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

export default UserProfile;
