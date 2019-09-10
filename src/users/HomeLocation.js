import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from "axios";
import "../styles.css";

const google = (window.google = window.google ? window.google : {});

class HomeLocation extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };

    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    // this.toggleEdit = this.toggleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadAutocomplete = this.loadAutocomplete.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  loadAutocomplete(event) {
    this.setState({
      homeLocation: event.target.value
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
        homeLocation: addressObject.formatted_address
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

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleSubmit(event);
    }
  };

  handleSubmit(event) {
    let address = this.state.homeLocation.split(" ").join("+");
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
      // <form
      //   onSubmit={e => {
      //     this.onSubmit(e);
      //   }}
      // >

      <div className="slider">
        <Script url="https://maps.googleapis.com/maps/apis/js?key=AIzaSyDkqVxDDu_TzV8SORSyM1rXVNP7qQfAGHg&libraries=places" />
        <input
          id="home_location_text_box"
          className="formFillIn"
          type="text"
          name="home_location_text_box"
          placeholder="Enter Home Location"
          value={this.props.homeLocation}
          onChange={e => {
            this.loadAutocomplete(e);
          }}
          onKeyPress={this.handleKeyPress}
          ref={input => {
            this.nameInput = input;
          }}
        />
      </div>
      // </form>
    );
  }
}

export default HomeLocation;
