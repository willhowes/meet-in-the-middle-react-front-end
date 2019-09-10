import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import HomeLocation from "./HomeLocation";
import WorkLocation from "./WorkLocation";
import FormData from "form-data";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      photo: "",
      name: this.props.currentUser.name || "",
      email: this.props.currentUser.email || "",
      homeLocation: this.props.currentUser.home_location || "",
      workLocation: this.props.currentUser.work_location || "",
      showForm: true,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  fileChangedHandler = event => {
    this.setState({ avatar: event.target.files[0] });
  };

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let data = new FormData();
    data.append("user[avatar]", e.target.avatar.files[0]);
    data.append("user[name]", this.state.name);
    data.append("user[email]", this.state.email);
    data.append("user[home_location]", this.state.homeLocation);
    data.append("user[work_location]", this.state.workLocation);

    axios({
      method: "patch",
      url: `https://localhost:3001/users/${this.props.currentUser.id}`,
      data: data,
      header: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        console.log("yay");
        this.setState({ showForm: false });
        console.log("success: ", response);
      })
      .catch(error => {
        console.error("nooo");
        console.error(error.response);
      });
  }


  render() {
    return (
      <div>
        {this.state.showForm ? (
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
                    Edit your account details
                  </div>
                  <div align="center">
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
                  <div>
                    <HomeLocation homeLocation={this.state.homeLocation} />
                  </div>
                  <div>
                    <WorkLocation workLocation={this.state.workLocation} />
                  </div>

                  <input
                    id="sign_up_button"
                    className="enterButton"
                    type="submit"
                    value="Update"
                  />
                </div>{" "}
              </center>
            </form>
          </div>
        ): null}
      </div>
    );
  }
}

UserProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
}

export default UserProfile;
