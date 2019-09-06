import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from 'axios';
import MidlPlaces from "./MidlPlaces";

class MidlLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.midlLocation = this.midlLocation.bind(this);
  }

  midlLocation() {
    if (this.props.markers[2]) {
      return `lat: ${this.props.markers[2].position.lat}, lng: ${this.props.markers[2].position.lng}`;
    }
  }

  midlPlaces() {
    if (this.props.markers[2]) {
      return `${this.props.markers[2].position.lat}, ${this.props.markers[2].position.lng}`;
    }
  }

  render() {
    return (
      <div style={{ margin: 10 }}>
        <p
          style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
        >
          Your Midl point is: {this.midlLocation()}
        </p>
        <div><MidlPlaces
              places={this.midlPlaces}/>
        </div>
      </div>
    );
  }
}

export default MidlLocation;
