import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from "axios";
import "./styles.css";

const google = (window.google = window.google ? window.google : {});

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
    isEditing: false,
    user: this.props.user,
  		"photo": "",
      "name": "",
  		"email": "",
  		"password": "",
      "home_location": ""
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
      console.log("yay");
    	console.log(response)
    })
    .catch(error => {
      console.log("nooo");
        console.log(error.response)
    });
  }

  loadAutocomplete(event) {
    this.setState({
      query: event.target.value
    });
    let autocomplete = new google.maps.places.Autocomplete(
      event.target,
      this.getOptions()
    );
    autocomplete.setFields(["address_components", "formatted_address"]);
    autocomplete.addListener("place_changed", () =>
      this._setAddress(autocomplete, event)
    );
  }

  _setAddress(autocomplete, event) {
    let addressObject = autocomplete.getPlace();
    let address = addressObject.address_components;

    if (address) {
      this.setState({
        query: addressObject.formatted_address
      });
      this.handleSubmit(event);
    }
  }

  getOptions() {
    let sw = new google.maps.LatLng(51.425564, -0.330801);
    let ne = new google.maps.LatLng(51.681786, 0.301162);
    let london = new google.maps.LatLngBounds(sw, ne);
    return { bounds: london };
  }

  handleSubmit(event) {
    let address = this.state.query.split(" ").join("+");
    let url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "+CA&key=AIzaSyDkqVxDDu_TzV8SORSyM1rXVNP7qQfAGHg";
    fetch(url)
      .then(json => json.json())
      .then(response =>
        this.props.updateMarkers(
          response.results[0].geometry.location,
          this.props.formNum
        )
      );
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

              <div className="slider">
                <Script url="https://maps.googleapis.com/maps/apis/js?key=AIzaSyDkqVxDDu_TzV8SORSyM1rXVNP7qQfAGHg&libraries=places" />
                <center>
                  <p className="greeting">{this.props.greeting}</p>
                </center>
                <input
                  id={`address_text_box${this.props.formNum + 1}`}
                  className="formFillIn"
                  type="text"
                  name="home_location"
                  placeholder={this.props.placeholder}
                  value={this.state.query}
                  onChange={e => {
                    this.loadAutocomplete(e);
                  }}
                  onKeyPress={this.handleKeyPress}
                  ref={input => {
                    this.nameInput = input;
                  }}
                />
              </div>

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
