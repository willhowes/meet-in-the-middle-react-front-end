import React from "react";
import Script from "react-load-script";
import "../styles.css";

const google = (window.google = window.google ? window.google : {});

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadAutocomplete = this.loadAutocomplete.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  handleSubmit(event) {
    let address = this.state.query.split(" ").join("+");
    let url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "+CA&key=AIzaSyBFZn8r3CA-KbGZ-vAz5oz7GLcwviIqG7U";
    fetch(url)
      .then(json => json.json())
      .then(response =>
        this.props.updateMarkers(
          response.results[0].geometry.location,
          this.props.formNum
        )
      );
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

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleSubmit(event);
    }
  };

  render() {
    console.log("render LocationForm");
    return (
      <div className="slider">
        <Script url="https://maps.googleapis.com/maps/apis/js?key=AIzaSyBFZn8r3CA-KbGZ-vAz5oz7GLcwviIqG7U&libraries=places" />
        <center>
          <p className="greeting">{this.props.greeting}</p>
        </center>
        <input
          id={`address_text_box${this.props.formNum + 1}`}
          className="address_text_box"
          type="text"
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
    );
  }
}

export default LocationForm;
