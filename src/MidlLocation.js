import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from 'axios';

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

  componentDidMount() {
    console.log("LOOK HERE")
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.516716, -0.072870&radius=1500&type=restaurant&key=AIzaSyAawXbpm33d8IIULhhrq-5JtHKwcacKbcY`)
    .then(res => console.log(res.data))
  }

  render() {
    return (
      <div style={{ margin: 10 }}>
        <p
          style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
        >
          Your Midl point is: {this.midlLocation()}
        </p>
      </div>
    );
  }
}

export default MidlLocation;
