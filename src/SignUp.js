import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from "axios";
// import ImageUploader from 'react-images-upload';
import "./styles.css";
// import fs from "fs";
import FormData from 'form-data';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
    "avatar": "",
		"name": "",
		"email": "",
		"password": "",
		"passwordConfirmation": "",
    showSignUp: true,

    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


fileChangedHandler = event => {
  // console.log(event.target.files[0]);
  this.setState({ avatar: event.target.files[0] })
}


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState(state => ({showLogIn: false}))
    let data = new FormData();
    data.append('user[avatar]', e.target.avatar.files[0])
    data.append('user[name]', this.state.name)
    data.append('user[email]', this.state.email)
    data.append('user[password]', this.state.password)
    data.append('user[password_confirmation]', this.state.passwordConfirmation)

    axios({
      method: 'post',
      url: 'http://localhost:3001/users',
      // url: 'https://meet-in-the-middle-backend-api.herokuapp.com/users',
      data: data,
      header: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'image/jpeg',
              },
        })
    .then(response => {
      this.setState(state => ({showSignUp: false}))
    	console.log(response)
    })
    .catch(error => {
        console.log(error.response)
    });
  }


  render() {
  return (

    <div>

      { this.state.showSignUp ?

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
        <img className="signUpAvatar" src={this.state.avatar}/>
          <input name="avatar" className="selectAvatar" type="file" onChange={this.fileChangedHandler}/>

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
                  className="formFillIn"
                  id="user_password_confirmation"
                  type="password"
                  name="passwordConfirmation"
                  placeholder={"Confirm password"}
                  value={this.state.passwordConfirmation}
                  onChange={this.onChange}
                />
              <input
                id="sign_up_submit"
                className="enterButton"
                type="submit"
                value="Sign up"
              />
            </div> </center>
        </form>
      </div>


      :
      null
    }

      </div>
    );
  }
}

export default SignUp;
