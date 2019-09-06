import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from "axios";
import MidlPlaces from "./MidlPlaces";

class MidlLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    console.log(this.props.midlMarker);
    return (
      <div style={{ margin: 10 }}>
        <p
          style={{ marginLeft: "10px", fontFamily: "Verdana", padding: "5px" }}
        >
          Your Midl point is: {this.props.midlLocation}
        </p>
        <div>
          <MidlPlaces midlMarker={this.props.midlMarker} />
        </div>
      </div>
    );
  }
}

export default MidlLocation;
