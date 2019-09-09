import React from "react";
import axios from "axios";
import MidlLocation from "./MidlLocation";

class MidlPlaces extends React.Component {
  constructor() {
    super();
    this.state = { places: [] };
    this.getPlaces = this.getPlaces.bind(this);
  }

  getPlaces() {
    console.log("Frothmaster");
    console.log(this.props.midlMarker);
    if (this.props.midlMarker[0] !== undefined) {
      return axios
        .get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.midlMarker[0].position.lat}, ${this.props.midlMarker[0].position.lng}&radius=500&type=restaurant&key=AIzaSyBFZn8r3CA-KbGZ-vAz5oz7GLcwviIqG7U`
        )
        .then(res => this.setState({ places: [res.data.results] }));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.midlMarker !== nextProps.midlMarker ||
      this.state.places !== nextState.places
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    this.getPlaces();
    console.log("render Places");
    console.log(this.state.places);
    return <div>{`${this.state.places}`}</div>;
  }
}

export default MidlPlaces;
