import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import HomeLocation from "./HomeLocation";
import WorkLocation from "./WorkLocation";
import SignUpAvatar from "./SignUpAvatar";
import ProfileAvatar from "./ProfileAvatar";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      photo: "",
      name: this.props.currentUser.name || "",
      email: this.props.currentUser.email || "",
      password: "",
      homeLocation: this.props.currentUser.home_location || "",
      workLocation: this.props.currentUser.work_location || "",
      showForm: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  fileChangedHandler = event => {
    this.setState({ avatar: event.target.files[0] });
  };

  onSubmit(e) {
    e.preventDefault();
    let data = new FormData();
    data.append("user[avatar]", e.target.avatar.files[0]);
    data.append("user[name]", this.state.name);
    data.append("user[email]", this.state.email);
    data.append("user[password]", this.state.password);
    data.append("user[home_location]", this.state.homeLocation);
    data.append("user[work_location]", this.state.workLocation);

    axios({
      method: "put",
      url: `http://localhost:3001/users/${this.props.currentUser.id}`,
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
        this.props.updateCurrentUser(response.data);
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
                  <img
                    className="formLogo"
                    src="midl-logo.png"
                    alt="Midl Logo"
                  />
                  <div className="formHeading">Edit your account details</div>

                  <div className="signUpAvatar">
                    {
                      <SignUpAvatar
                        avatarBlob={this.state.avatar}
                        avatarPath={this.props.currentUser.avatar_path}
                      />
                    }
                  </div>

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
                  <div>
                    <HomeLocation
                      homeLocation={this.state.homeLocation}
                      onHomeLocationChange={location =>
                        this.setState({ homeLocation: location })
                      }
                    />
                  </div>
                  <div>
                    <WorkLocation
                      workLocation={this.state.workLocation}
                      onWorkLocationChange={location =>
                        this.setState({ workLocation: location })
                      }
                    />
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
        ) : null}
      </div>
    );
  }
}

UserProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired
};

export default UserProfile;
