/*global google*/

import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import "./styles.css";

const google = (window.google = window.google ? window.google : {});

class LocationFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query1: "",
      query2: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadAutocomplete = this.loadAutocomplete.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  handleSubmit(query, event) {
    event.preventDefault();
    let address = this.state[query].split(" ").join("+");
    let url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "+CA&key=AIzaSyAawXbpm33d8IIULhhrq-5JtHKwcacKbcY";
    fetch(url)
      .then(json => json.json())
      .then(response =>
        this.props.updateMarkers(response.results[0].geometry.location)
      );
  }

  loadAutocomplete(query, event) {
    this.setState({
      [query]: event.target.value
    });
    let autocomplete = new google.maps.places.Autocomplete(
      event.target,
      this.getOptions()
    );
    autocomplete.setFields(["address_components", "formatted_address"]);
    autocomplete.addListener("place_changed", () =>
      this._setAddress(autocomplete, query)
    );
  }

  _setAddress(autocomplete, query) {
    let addressObject = autocomplete.getPlace();
    let address = addressObject.address_components;

    if (address) {
      this.setState({
        [query]: addressObject.formatted_address
      });
    }
  }

  getOptions() {
    let sw = new google.maps.LatLng(51.425564, -0.330801);
    let ne = new google.maps.LatLng(51.681786, 0.301162);
    let london = new google.maps.LatLngBounds(sw, ne);
    var options = {
      bounds: london
    };
    return options;
  }

  render() {
    return (
      <div style={{ margin: 10 }}>
        <Script
          url="https://maps.googleapis.com/maps/apis/js?key=AIzaSyAawXbpm33d8IIULhhrq-5JtHKwcacKbcY&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <p
          style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
        >
          First enter your location
        </p>
        <form
          onSubmit={e => {
            this.handleSubmit("query1", e);
          }}
        >
          <input
            id="address_text_box1"
            class="address_text_box1"
            className="address_text_box"
            type="text"
            placeholder={"Where are you?"}
            value={this.state.query1}
            onChange={e => {
              this.loadAutocomplete("query1", e);
            }}
          />
          <input type="submit" id="find_yourself" value="Find" />
        </form>
        <p
          style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
        >
          Now enter your friend's location
        </p>
        <form
          onSubmit={event => {
            this.handleSubmit("query2", event);
          }}
        >
          <input
            id="address_text_box2"
            className="address_text_box"
            type="text"
            placeholder={"Where's your friend?"}
            value={this.state.query2}
            onChange={event => {
              this.loadAutocomplete("query2", event);
            }}
          />
          <input type="submit" id="find_a_friend" value="Find" />
        </form>
        <input
          onClick={this.props.addMidlMarker}
          id="find_midl"
          className="myButton"
          type="submit"
          value="Find Midl"
        />
      </div>
    );
  }
}

export default LocationFinder;
