import React from "react";
import Script from "react-load-script";

const google = (window.google = window.google ? window.google : {});

class LocationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.handleHomeSubmit = this.handleHomeSubmit.bind(this);
    this.handleWorkSubmit = this.handleWorkSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadAutocomplete = this.loadAutocomplete.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.favouritesButtons = this.favouritesButtons.bind(this);
  }

  handleSubmit(event) {
    let address = this.state.query.split(" ").join("+");
    let url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "+CA&key=AIzaSyBtfqMF3gKW4w70BGZRfg3NfsXakHOSS9A";
    fetch(url)
      .then(json => json.json())
      .then(response =>
        this.props.updateMarkers(
          response.results[0].geometry.location,
          this.props.formNum
        )
      );
  }

  handleHomeSubmit(event) {
    this.setState({ query: this.props.currentUser.home_location });
    let address = this.props.currentUser.home_location.split(" ").join("+");
    let url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "+CA&key=AIzaSyBtfqMF3gKW4w70BGZRfg3NfsXakHOSS9A";
    fetch(url)
      .then(json => json.json())
      .then(response =>
        this.props.updateMarkers(
          response.results[0].geometry.location,
          this.props.formNum
        )
      );
  }

  handleWorkSubmit(event) {
    this.setState({ query: this.props.currentUser.work_location });
    let address = this.props.currentUser.work_location.split(" ").join("+");
    let url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "+CA&key=AIzaSyBtfqMF3gKW4w70BGZRfg3NfsXakHOSS9A";
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

  favouritesButtons(){
    if (this.props.currentUser.name === '' || this.props.currentUser === null || this.props.currentUser.home_location === null || this.props.currentUser.work_location === null ) {
      return null
    } else {
      return (
        <div><button className="homeWorkButtons" onClick={this.handleHomeSubmit}>Home</button>
        <button className="homeWorkButtons" onClick={this.handleWorkSubmit}>Work</button></div>
      )
    }
  }

  render() {
    return (
      <div className="slider">
        <Script url="https://maps.googleapis.com/maps/apis/js?key=AIzaSyBtfqMF3gKW4w70BGZRfg3NfsXakHOSS9A&libraries=places" />
        <div >
          <span style={{width: "180px", margin: 5, display: 'inline-block'}}className="greeting">{this.props.greeting}</span>
          {this.favouritesButtons()}
        </div>
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
