import React from "react";
import PropTypes from "prop-types";
import Script from "react-load-script";

const google = (window.google = window.google ? window.google : {});

class HomeLocation extends React.Component {
  constructor(props) {
    super(props);
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    // this.toggleEdit = this.toggleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadAutocomplete = this.loadAutocomplete.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  loadAutocomplete(event) {
    this.props.onHomeLocationChange(event.target.value);
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
      this.props.onHomeLocationChange(addressObject.formatted_address);
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
    let address = this.props.homeLocation.split(" ").join("+");
    let url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "+CA&key=AIzaSyBtfqMF3gKW4w70BGZRfg3NfsXakHOSS9A";
    fetch(url)
      .then(json => json.json())
  }

  render() {
    return (
      // <form
      //   onSubmit={e => {
      //     this.onSubmit(e);
      //   }}
      // >

      <div className="slider">
        <Script url="https://maps.googleapis.com/maps/apis/js?key=AIzaSyBtfqMF3gKW4w70BGZRfg3NfsXakHOSS9A&libraries=places" />
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

HomeLocation.propTypes = {
  homeLocation: PropTypes.any,
  onHomeLocationChange: PropTypes.func.isRequired,
}

export default HomeLocation;
